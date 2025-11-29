'use client';

import { StudentPacingStatus } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface PacingStudentRowProps {
  student: StudentPacingStatus;
}

export function PacingStudentRow({ student }: PacingStudentRowProps) {
  // Determine color based on variance
  const getVarianceColor = () => {
    if (student.pacingStatus === 'on-track') {
      return 'bg-emerald-100 text-emerald-900';
    }
    if (Math.abs(student.variancePercentage) <= 10) {
      return 'bg-amber-100 text-amber-900';
    }
    return 'bg-red-100 text-red-900';
  };

  const getProgressBarColor = () => {
    if (student.pacingStatus === 'on-track') {
      return 'bg-emerald-500';
    }
    if (Math.abs(student.variancePercentage) <= 10) {
      return 'bg-amber-500';
    }
    return 'bg-red-500';
  };

  return (
    <tr className="hover:bg-gray-50 border-b border-gray-200">
      <td className="px-4 py-3">
        <div className="font-medium text-gray-900">{student.studentName}</div>
        <div className="text-xs text-gray-500">Grade {student.grade}</div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        {student.lessonsCompleted}/{student.totalLessonsForGrade}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 max-w-xs">
            <div className="relative w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${getProgressBarColor()}`}
                style={{ width: `${Math.min(student.actualCompletionPercentage, 100)}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
            {student.actualCompletionPercentage}%
          </span>
        </div>
      </td>
      <td className="px-4 py-3">
        <Badge className={getVarianceColor()}>
          {student.variancePercentage >= 0 ? '+' : ''}{student.variancePercentage}%
        </Badge>
      </td>
      <td className="px-4 py-3">
        <span className={`text-xs font-semibold ${
          student.pacingStatus === 'on-track'
            ? 'text-emerald-700'
            : 'text-red-700'
        }`}>
          {student.pacingStatus === 'on-track' ? 'On Track' : 'Behind'}
        </span>
      </td>
    </tr>
  );
}
