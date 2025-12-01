'use client';

import { useState, useEffect, useMemo } from 'react';
import { Student, CurriculumStatus } from '@/lib/types';
import { useRole } from '@/lib/context/RoleContext';
import { FLAG_TYPES } from '@/lib/data/students';
import { getStudentUnits } from '@/lib/data/studentUnits';
import { daysSinceDateString, isStaleGPA, formatDaysAsAge } from '@/lib/utils/dateUtils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { GhostInsightCard } from '@/components/dashboard/GhostInsightCard';
import { UnitTimelineCard } from '@/components/dashboard/UnitTimelineCard';
import { SentimentAlertCard } from '@/components/dashboard/SentimentAlertCard';
import { CollegeListCard } from '@/components/dashboard/CollegeListCard';
import { ApplicationStatusCard } from '@/components/dashboard/ApplicationStatusCard';

interface DetailPanelProps {
  student: Student | null;
  curriculumStatus?: CurriculumStatus;
  onClose: () => void;
  onAddFlag?: (note: string) => void;
  onOverrideStatus?: (reason: string) => void;
  onSubmitGrade?: (grade: string, feedback: string) => void;
  onSaveAdminNote?: (note: string) => void;
  onEscalate?: (counselor: string) => void;
}

export function DetailPanel({
  student,
  curriculumStatus,
  onClose,
  onAddFlag,
  onOverrideStatus,
  onSubmitGrade,
  onSaveAdminNote,
  onEscalate,
}: DetailPanelProps) {
  const { role } = useRole();
  const [flagNote, setFlagNote] = useState('');
  const [gradeValue, setGradeValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [escalateCounselor, setEscalateCounselor] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // Only render date-dependent content after client mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!student) return null;

  const handleAddFlag = () => {
    if (flagNote.trim()) {
      onAddFlag?.(flagNote);
      setFlagNote('');
    }
  };

  const handleOverride = () => {
    const reason = prompt('Provide reason for status override:');
    if (reason) {
      onOverrideStatus?.(reason);
    }
  };

  const handleSubmitGrade = () => {
    if (gradeValue && feedback.trim()) {
      onSubmitGrade?.(gradeValue, feedback);
      setGradeValue('');
      setFeedback('');
    }
  };

  const handleSaveAdminNote = () => {
    if (adminNote.trim()) {
      onSaveAdminNote?.(adminNote);
      setAdminNote('');
    }
  };

  const handleEscalate = () => {
    if (escalateCounselor) {
      onEscalate?.(escalateCounselor);
      setEscalateCounselor('');
    }
  };

  return (
    <Dialog open={student !== null} onOpenChange={onClose}>
      <DialogContent suppressHydrationWarning className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="mb-4">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {student.name}
            </DialogTitle>
            <p className="mt-2 text-sm text-gray-600">Grade {student.grade}</p>
            <div className="mt-2 flex items-center gap-2">
              <span
                className={`inline-block h-3 w-3 rounded-full ${
                  student.status === 'on-track' ? 'bg-green-600' : 'bg-red-600'
                }`}
              />
              <span className="font-semibold">
                {student.status === 'on-track' ? 'On Track' : 'Off Track'}
              </span>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Logic / Grade Info */}
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-600">
              {role === 'teacher' ? 'Assignment & Grade Info' : 'Status Logic'}
            </h3>
            <Card
              className={`p-3 text-sm ${
                student.status === 'off-track'
                  ? 'bg-red-50'
                  : 'bg-green-50'
              }`}
            >
              {student.statusReason}
            </Card>
          </div>

          {/* Ghost Insight Card */}
          {student && curriculumStatus && (
            <GhostInsightCard student={student} curriculumStatus={curriculumStatus} />
          )}

          {/* Unit Timeline */}
          {student && (
            <UnitTimelineCard units={getStudentUnits(student.id)} />
          )}

          {/* College List (for 11th/12th graders) */}
          {student && (student.grade === 11 || student.grade === 12) && student.collegeList && (
            <CollegeListCard colleges={student.collegeList} />
          )}

          {/* Application Status (for 12th graders) */}
          {student && student.grade === 12 && student.applications && (
            <ApplicationStatusCard applications={student.applications} />
          )}

          {/* Sentiment Alert - Special Handling (Priority 1) */}
          {student.flags.includes('sentiment') && (
            <SentimentAlertCard
              excerpt="Reflection content suggests student may benefit from counselor support"
              onContactCounselor={() => alert('Contacting counselor for student ' + student.name)}
              onEscalate={() => alert('Escalating to admin for student ' + student.name)}
              onDocument={() => alert('Documenting and setting monitoring flag for student ' + student.name)}
            />
          )}

          {/* Flags / Active Items */}
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-600">
              Active Flags
            </h3>
            {student.flags.length === 0 ? (
              <p className="text-sm text-gray-500">No active flags</p>
            ) : (
              <div className="space-y-2">
                {student.flags
                  .filter(flagType => flagType !== 'sentiment') // Sentiment handled above
                  .map((flagType) => {
                    const flag = FLAG_TYPES[flagType];
                    return (
                      <Card
                        key={flagType}
                        className="bg-amber-50 p-3"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-lg">{flag.icon}</span>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{flag.name}</p>
                            <p className="text-xs text-gray-700">{flag.description}</p>
                            {flag.reason && (
                              <p className="mt-1 text-xs font-medium text-amber-900">
                                {flag.reason}
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Academic Data (Counselor only) */}
          {role === 'counselor' && (
            <div suppressHydrationWarning>
              <Card
                className={`p-3 text-sm ${
                  isMounted && isStaleGPA(student.dataDate, new Date())
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-gray-50'
                }`}
              >
                <p className="font-semibold text-gray-900">Last Academic Data</p>
                <p>GPA: <strong>{student.gpa}</strong></p>
                <p>Entered: <strong>{student.dataDate}</strong></p>
                {isMounted && (
                  (() => {
                    const daysOld = daysSinceDateString(student.dataDate, new Date());
                    const isStale = isStaleGPA(student.dataDate, new Date());
                    const ageText = daysOld ? formatDaysAsAge(daysOld) : 'unknown';

                    return isStale && daysOld ? (
                      <div className="mt-2 rounded bg-amber-100 px-2 py-1">
                        <p className="text-xs font-semibold text-amber-900">
                          ⚠️ Data is {ageText}
                        </p>
                        <p className="text-xs text-amber-800">
                          Consider updating GPA to reflect current performance
                        </p>
                      </div>
                    ) : null;
                  })()
                )}
              </Card>
            </div>
          )}

          {/* Role-Specific Actions */}
          {role === 'counselor' && (
            <div className="space-y-3 border-t pt-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Add Staff Follow-up Flag
                </label>
                <Textarea
                  placeholder="Describe the follow-up needed..."
                  value={flagNote}
                  onChange={(e) => setFlagNote(e.target.value)}
                  className="mb-2"
                />
                <Button
                  onClick={handleAddFlag}
                  className="w-full bg-cyan-600 hover:bg-cyan-700"
                >
                  Add Flag
                </Button>
              </div>
              <Button
                onClick={handleOverride}
                variant="outline"
                className="w-full"
              >
                Override Status
              </Button>
            </div>
          )}

          {role === 'teacher' && (
            <div className="space-y-3 border-t pt-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Grade Current Assignment
                </label>
                <Select value={gradeValue} onValueChange={setGradeValue}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a grade..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">A (90-100)</SelectItem>
                    <SelectItem value="b">B (80-89)</SelectItem>
                    <SelectItem value="c">C (70-79)</SelectItem>
                    <SelectItem value="d">D (60-69)</SelectItem>
                    <SelectItem value="f">F (Below 60)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Feedback
                </label>
                <Textarea
                  placeholder="Add feedback for student..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
              <Button
                onClick={handleSubmitGrade}
                className="w-full bg-cyan-600 hover:bg-cyan-700"
              >
                Submit Grade & Feedback
              </Button>
            </div>
          )}

          {role === 'admin' && (
            <div className="space-y-3 border-t pt-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Admin Notes
                </label>
                <Textarea
                  placeholder="Case notes and next steps..."
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  className="mb-2"
                />
                <Button
                  onClick={handleSaveAdminNote}
                  className="w-full bg-cyan-600 hover:bg-cyan-700"
                >
                  Save Case Note
                </Button>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Escalate to Counselor
                </label>
                <Select value={escalateCounselor} onValueChange={setEscalateCounselor}>
                  <SelectTrigger className="mb-2">
                    <SelectValue placeholder="Select counselor..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smith">Sarah Smith</SelectItem>
                    <SelectItem value="jones">Michael Jones</SelectItem>
                    <SelectItem value="garcia">Elena Garcia</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleEscalate}
                  variant="outline"
                  className="w-full"
                >
                  Escalate Case
                </Button>
              </div>
            </div>
          )}

          <Button
            onClick={onClose}
            variant="outline"
            className="w-full"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
