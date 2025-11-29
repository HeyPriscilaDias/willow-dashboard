'use client';

import { useState, useMemo } from 'react';
import { Student, AnalyticsCard as AnalyticsCardType, CurriculumStatus } from '@/lib/types';
import { STUDENTS } from '@/lib/data/students';
import { STUDENT_LESSON_COMPLETIONS } from '@/lib/data/studentProgress';
import { useRole } from '@/lib/context/RoleContext';
import { Analytics } from '@/components/dashboard/Analytics';
import { TriageList } from '@/components/dashboard/TriageList';
import { DetailPanel } from '@/components/dashboard/DetailPanel';
import { FidelityModal } from '@/components/dashboard/FidelityModal';
import { CurriculumPacingModal } from '@/components/dashboard/CurriculumPacingModal';
import {
  calculateOverallPacingMetrics,
  getAllGradeAggregates,
  calculateStudentCurriculumStatus,
} from '@/lib/utils/pacingCalculations';

export function DashboardContent() {
  const { role } = useRole();
  const [students, setStudents] = useState(STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [fidelityModalOpen, setFidelityModalOpen] = useState(false);
  const [curriculumPacingModalOpen, setCurriculumPacingModalOpen] = useState(false);

  // Calculate pacing metrics and aggregates
  const pacingMetrics = useMemo(
    () => calculateOverallPacingMetrics(students, STUDENT_LESSON_COMPLETIONS),
    [students]
  );

  const gradeAggregates = useMemo(
    () => getAllGradeAggregates(students, STUDENT_LESSON_COMPLETIONS),
    [students]
  );

  // Calculate curriculum status for all students (detects Ghost scenarios)
  const curriculumStats = useMemo(
    () => {
      const stats: Record<number, CurriculumStatus> = {};
      students.forEach(student => {
        stats[student.id] = calculateStudentCurriculumStatus(student, STUDENT_LESSON_COMPLETIONS);
      });
      return stats;
    },
    [students]
  );

  const getCounselorAnalytics = (): AnalyticsCardType[] => [
    { label: 'My Students', value: 28, detail: 'Assigned to you', variant: 'default' },
    { label: 'Off Track', value: 6, detail: 'Need intervention', variant: 'off-track' },
    { label: 'Urgent Today', value: 4, detail: 'Requires follow-up', variant: 'urgent' },
    { label: 'Next Meeting', value: 'Today', detail: 'Jordan Martinez, 2pm', variant: 'default' },
  ];

  const getAdminAnalytics = (): AnalyticsCardType[] => [
    { label: 'Off Track', value: 47, detail: 'Requiring Intervention', variant: 'off-track' },
    { label: 'Urgent Flags', value: 23, detail: 'Sentiment + Academic', variant: 'urgent' },
    { label: 'Curriculum Progress', value: '75%', detail: '175 of 234 lessons unlocked', variant: 'fidelity' },
    { label: 'Curriculum Pacing', value: `${pacingMetrics.onPacePercentage}%`, detail: `${pacingMetrics.onPacePercentage}% on pace`, variant: 'pacing' },
  ];

  const getTeacherAnalytics = (): AnalyticsCardType[] => [
    { label: 'Caseload', value: 28, detail: 'Total students', variant: 'default' },
    { label: 'Missing Work', value: 5, detail: 'Current assignment', variant: 'off-track' },
    { label: 'Concerns', value: 3, detail: 'Low engagement', variant: 'urgent' },
    { label: 'Submitted', value: 23, detail: '82% completion', variant: 'default' },
  ];

  const getTriageTitle = () => {
    return 'Student Progress';
  };

  const getAnalyticsTitle = () => {
    switch (role) {
      case 'admin':
        return 'Dashboard Overview';
      case 'teacher':
        return 'Your Class Dashboard';
      default:
        return 'Your Students Overview';
    }
  };

  const getAnalyticsData = () => {
    switch (role) {
      case 'admin':
        return getAdminAnalytics();
      case 'teacher':
        return getTeacherAnalytics();
      default:
        return getCounselorAnalytics();
    }
  };

  const handleAddFlag = (note: string) => {
    if (selectedStudent) {
      setStudents(
        students.map((s) =>
          s.id === selectedStudent.id
            ? { ...s, flags: [...s.flags, 'staff'] }
            : s
        )
      );
      setSelectedStudent(null);
      alert('Staff Follow-up flag added successfully');
    }
  };

  const handleOverrideStatus = (reason: string) => {
    if (selectedStudent) {
      setStudents(
        students.map((s) =>
          s.id === selectedStudent.id
            ? {
              ...s,
              status: s.status === 'on-track' ? 'off-track' : 'on-track',
              flags: [...s.flags, 'staff'],
            }
            : s
        )
      );
      setSelectedStudent(null);
      alert(`Status overridden. Staff Follow-up flag added with reason: ${reason}`);
    }
  };

  const handleSubmitGrade = (grade: string, feedback: string) => {
    alert(`Grade submitted for ${selectedStudent?.name}: ${grade.toUpperCase()}\n\nFeedback recorded.`);
    setSelectedStudent(null);
  };

  const handleSaveAdminNote = (note: string) => {
    alert(`Case note saved for ${selectedStudent?.name}`);
    setSelectedStudent(null);
  };

  const handleEscalate = (counselor: string) => {
    const counselorNames: Record<string, string> = {
      smith: 'Sarah Smith',
      jones: 'Michael Jones',
      garcia: 'Elena Garcia',
    };
    alert(`Case escalated to ${counselorNames[counselor]} for ${selectedStudent?.name}`);
    setSelectedStudent(null);
  };

  return (
    <div className="space-y-8">
      <Analytics
        title={getAnalyticsTitle()}
        cards={getAnalyticsData()}
        onFidelityClick={() => setFidelityModalOpen(true)}
        onCurriculumPacingClick={() => setCurriculumPacingModalOpen(true)}
      />

      <TriageList
        students={students}
        curriculumStats={curriculumStats}
        onSelectStudent={setSelectedStudent}
        title={getTriageTitle()}
      />

      <DetailPanel
        student={selectedStudent}
        curriculumStatus={selectedStudent ? curriculumStats[selectedStudent.id] : undefined}
        onClose={() => setSelectedStudent(null)}
        onAddFlag={handleAddFlag}
        onOverrideStatus={handleOverrideStatus}
        onSubmitGrade={handleSubmitGrade}
        onSaveAdminNote={handleSaveAdminNote}
        onEscalate={handleEscalate}
      />

      <FidelityModal
        open={fidelityModalOpen}
        onClose={() => setFidelityModalOpen(false)}
      />

      <CurriculumPacingModal
        open={curriculumPacingModalOpen}
        onClose={() => setCurriculumPacingModalOpen(false)}
        gradeAggregates={gradeAggregates}
        metrics={pacingMetrics}
      />
    </div>
  );
}
