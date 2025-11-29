'use client';

import { Student, CurriculumStatus } from '@/lib/types';
import { Card } from '@/components/ui/card';

interface GhostInsightCardProps {
  student: Student;
  curriculumStatus: CurriculumStatus;
}

export function GhostInsightCard({ student, curriculumStatus }: GhostInsightCardProps) {
  if (!curriculumStatus.isGhost) {
    return null;
  }

  const daysOverdue = Math.floor(
    (new Date('2024-11-28').getTime() - new Date('2024-11-15').getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-4 border-b pb-6">
      <div className="flex items-center gap-2">
        <span className="text-lg">🚨</span>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-600">
          Engagement Pattern Detected
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Academic Performance Card */}
        <Card className="bg-emerald-50 p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span>✅</span>
              <p className="text-xs font-semibold uppercase text-gray-600">Academic Performance</p>
            </div>
            <p className="text-2xl font-bold text-emerald-900">{student.gpa}</p>
            <p className="text-xs text-emerald-700">GPA (as of {student.dataDate})</p>
            <p className="text-xs text-emerald-700">Excellent performance</p>
          </div>
        </Card>

        {/* Curriculum Engagement Card */}
        <Card className="bg-red-50 p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span>❌</span>
              <p className="text-xs font-semibold uppercase text-gray-600">Curriculum Engagement</p>
            </div>
            <p className="text-2xl font-bold text-red-900">{curriculumStatus.completionPercentage}%</p>
            <p className="text-xs text-red-700">
              {curriculumStatus.lessonsCompleted}/{curriculumStatus.totalLessonsForGrade} lessons
            </p>
            <p className="text-xs text-red-700">Expected: {curriculumStatus.expectedCompletionPercentage}%</p>
          </div>
        </Card>
      </div>

      {/* Key Insight Section */}
      <Card className="bg-amber-50 p-4 border-l-4 border-amber-400">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-600">Key Insight</p>
          <p className="text-sm text-gray-800">
            High-performing student with <strong>zero curriculum engagement</strong>. This pattern suggests the student may need:
          </p>
          <ul className="space-y-1 ml-4 list-disc text-sm text-gray-700">
            <li>Enrollment or enrollment confirmation support</li>
            <li>Curriculum onboarding or orientation</li>
            <li>Clarification on expectations and deadlines</li>
            <li>One-on-one outreach rather than academic intervention</li>
          </ul>
          {daysOverdue > 0 && (
            <p className="text-xs text-amber-700 font-semibold mt-2">
              ⚠️ Unit 1 is {daysOverdue} days overdue (due Nov 15)
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
