'use client';

import { PacingMetrics } from '@/lib/types';
import { Card } from '@/components/ui/card';

interface CurriculumPacingCardProps {
  metrics: PacingMetrics;
  onOpen?: () => void;
}

export function CurriculumPacingCard({ metrics, onOpen }: CurriculumPacingCardProps) {
  return (
    <Card
      onClick={onOpen}
      className={`p-6 transition-all bg-emerald-50 ${
        onOpen ? 'cursor-pointer hover:shadow-md hover:scale-102' : ''
      }`}
    >
      <p className="mb-3 text-sm font-semibold text-gray-700">
        Curriculum Pacing
      </p>
      <p className="mb-2 text-4xl font-bold text-gray-900">{metrics.onPacePercentage}%</p>
      <p className={`text-sm ${metrics.onPacePercentage >= 75 ? 'text-emerald-700 font-medium' : 'text-gray-700'}`}>
        {metrics.onPacePercentage >= 75
          ? `${metrics.totalStudents} students on pace`
          : `${metrics.behindPercentage}% behind pace`}
      </p>
      {onOpen && (
        <p className="mt-4 text-sm font-semibold text-emerald-700">
          Click for details
        </p>
      )}
    </Card>
  );
}
