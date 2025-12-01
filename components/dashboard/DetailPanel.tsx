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
import { FinancialAidCard } from '@/components/dashboard/FinancialAidCard';
import { AlternativePathCard } from '@/components/dashboard/AlternativePathCard';
import { StatusOverrideModal } from '@/components/dashboard/StatusOverrideModal';
import { StatusOverrideCard } from '@/components/dashboard/StatusOverrideCard';

interface DetailPanelProps {
  student: Student | null;
  curriculumStatus?: CurriculumStatus;
  onClose: () => void;
  onAddFlag?: (note: string) => void;
  onOverrideStatus?: (reason: string) => void;
  onApproveArtifact?: () => void;
  onFlagArtifactRevision?: (reason: string) => void;
  onSaveAdminNote?: (note: string) => void;
  onEscalate?: (counselor: string) => void;
}

export function DetailPanel({
  student,
  curriculumStatus,
  onClose,
  onAddFlag,
  onOverrideStatus,
  onApproveArtifact,
  onFlagArtifactRevision,
  onSaveAdminNote,
  onEscalate,
}: DetailPanelProps) {
  const { role } = useRole();
  const [flagNote, setFlagNote] = useState('');
  const [revisionReason, setRevisionReason] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [escalateCounselor, setEscalateCounselor] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [showOverrideModal, setShowOverrideModal] = useState(false);

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
    setShowOverrideModal(true);
  };

  const handleOverrideConfirm = (reason: string) => {
    onOverrideStatus?.(reason);
  };

  // Sort flags by priority: Sentiment > Deadline > Action > Informational
  const getSortedFlags = (flags: string[]) => {
    const priority: Record<string, number> = {
      'sentiment': 0,  // Safety concern (highest priority)
      'deadline': 1,   // Time-critical
      'revision': 2,   // Needs action
      'strategy': 2,   // Needs action
      'academic': 3,   // Informational
      'staff': 3       // Informational
    };

    return [...flags].sort((a, b) => {
      const priorityA = priority[a] ?? 99;
      const priorityB = priority[b] ?? 99;
      return priorityA - priorityB;
    });
  };

  const handleApproveArtifact = () => {
    onApproveArtifact?.();
    setRevisionReason('');
  };

  const handleFlagArtifactRevision = () => {
    if (revisionReason.trim()) {
      onFlagArtifactRevision?.(revisionReason);
      setRevisionReason('');
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
      <DialogContent suppressHydrationWarning className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto p-6">
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

        {/* Top Section: Status + Override */}
        <div className="space-y-4">
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

          {/* Status Override Card - Show if override exists */}
          {student.statusOverride && (
            <StatusOverrideCard
              override={student.statusOverride}
              onRemove={() => {
                // In a real app, this would update the student data
                // For now, just alert
                alert('Override removed');
              }}
            />
          )}
        </div>

        {/* Main Content Grid: 2 columns on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT COLUMN: Curriculum & Academic */}
          <div className="space-y-6">
            {/* Ghost Insight Card */}
            {student && curriculumStatus && (
              <GhostInsightCard student={student} curriculumStatus={curriculumStatus} />
            )}

            {/* Unit Timeline */}
            {student && (
              <UnitTimelineCard units={getStudentUnits(student.id)} />
            )}

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
          </div>

          {/* RIGHT COLUMN: Post-Secondary & Flags */}
          <div className="space-y-6">
            {/* College List (for 11th/12th graders) */}
            {student && (student.grade === 11 || student.grade === 12) && student.collegeList && (
              <CollegeListCard colleges={student.collegeList} />
            )}

            {/* Alternative Path (for 12th graders pursuing non-college paths) */}
            {student && student.grade === 12 && student.postSecondaryPath && (
              <AlternativePathCard path={student.postSecondaryPath} />
            )}

            {/* Application Status (for 12th graders pursuing college) */}
            {student && student.grade === 12 && student.applications && (
              <ApplicationStatusCard applications={student.applications} />
            )}

            {/* Financial Aid Status (for 12th graders) */}
            {student && student.grade === 12 && (
              <FinancialAidCard
                fafsaStatus={student.fafsaStatus}
                scholarships={student.scholarships}
                financialAidMilestones={student.financialAidMilestones}
              />
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

            {/* Flags / Active Items (Priority Sorted) */}
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-600">
                Active Flags
              </h3>
              {student.flags.length === 0 ? (
                <p className="text-sm text-gray-500">No active flags</p>
              ) : (
                <div className="space-y-2">
                  {getSortedFlags(student.flags)
                    .filter(flagType => flagType !== 'sentiment') // Sentiment handled above (always first in UI)
                    .map((flagType) => {
                      const flag = FLAG_TYPES[flagType];
                      // Color coding by priority
                      let bgColor = 'bg-amber-50'; // Default
                      if (flagType === 'deadline') bgColor = 'bg-red-50';
                      if (flagType === 'revision' || flagType === 'strategy') bgColor = 'bg-blue-50';
                      if (flagType === 'academic' || flagType === 'staff') bgColor = 'bg-gray-50';

                      return (
                        <Card
                          key={flagType}
                          className={`${bgColor} p-3`}
                        >
                          <div className="flex items-start gap-2">
                            <span className="text-lg">{flag.icon}</span>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900">{flag.name}</p>
                              <p className="text-xs text-gray-700">{flag.description}</p>
                              {flag.reason && (
                                <p className="mt-1 text-xs font-medium text-gray-800">
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
          </div>
        </div>

        {/* Role-Specific Actions (Full Width Below Grid) */}
        <div className="border-t pt-6">
          {role === 'counselor' && (
            <div className="space-y-3">
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
            <div className="space-y-3">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Artifact Assessment
                </label>
                <p className="mb-3 text-sm text-gray-700">
                  Review the student's submitted artifact for curriculum quality standards.
                </p>
              </div>
              <Button
                onClick={handleApproveArtifact}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                ✓ Approve Artifact
              </Button>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Flag for Revision
                </label>
                <Textarea
                  placeholder="What needs to be improved? (Be specific about quality standards not met)"
                  value={revisionReason}
                  onChange={(e) => setRevisionReason(e.target.value)}
                  className="mb-2"
                />
                <Button
                  onClick={handleFlagArtifactRevision}
                  variant="outline"
                  className="w-full"
                >
                  Flag for Revision
                </Button>
              </div>
            </div>
          )}

          {role === 'admin' && (
            <div className="space-y-3">
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

      {/* Status Override Modal */}
      <StatusOverrideModal
        open={showOverrideModal}
        onClose={() => setShowOverrideModal(false)}
        onConfirm={handleOverrideConfirm}
        studentName={student?.name || 'Student'}
      />
    </Dialog>
  );
}
