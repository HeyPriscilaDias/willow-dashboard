'use client';

import { useState } from 'react';
import { GradePacingAggregate } from '@/lib/types';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PacingStudentRow } from './PacingStudentRow';
import { ChevronDown } from 'lucide-react';

interface PacingGradeSectionProps {
  gradeData: GradePacingAggregate;
}

export function PacingGradeSection({ gradeData }: PacingGradeSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const percentageColor = gradeData.onPacePercentage >= 75 ? 'text-emerald-700' : 'text-amber-700';

  return (
    <Card className="bg-white border-gray-200 overflow-hidden">
      {/* Grade Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer"
      >
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-900">Grade {gradeData.grade}</h3>
            <span className="text-sm text-gray-600">
              {gradeData.onPaceCount} on pace • {gradeData.behindCount} behind
            </span>
          </div>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-emerald-500"
                  style={{ width: `${gradeData.onPacePercentage}%` }}
                />
              </div>
              <span className={`text-sm font-semibold ${percentageColor}`}>
                {gradeData.onPacePercentage}%
              </span>
            </div>
            {gradeData.averageVariancePercentage !== 0 && (
              <span className="text-sm text-gray-600">
                Avg variance: {gradeData.averageVariancePercentage > 0 ? '+' : ''}
                {gradeData.averageVariancePercentage}%
              </span>
            )}
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Expanded Content - Student Details Table */}
      {isExpanded && gradeData.studentDetails.length > 0 && (
        <div className="border-t border-gray-200 overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="px-4 py-3">Student</TableHead>
                <TableHead className="px-4 py-3">Completed</TableHead>
                <TableHead className="px-4 py-3">Progress</TableHead>
                <TableHead className="px-4 py-3">Variance</TableHead>
                <TableHead className="px-4 py-3">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gradeData.studentDetails.map(student => (
                <PacingStudentRow key={student.studentId} student={student} />
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Empty State */}
      {isExpanded && gradeData.studentDetails.length === 0 && (
        <div className="px-6 py-8 text-center text-gray-500">
          <p className="text-sm">No students match the selected filters</p>
        </div>
      )}
    </Card>
  );
}
