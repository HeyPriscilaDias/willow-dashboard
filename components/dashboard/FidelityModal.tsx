'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import {
  FIDELITY_PROGRESS,
  GRADE_FIDELITY,
  TOTAL_LESSONS_UNLOCKED,
  TOTAL_LESSONS,
  OVERALL_PERCENTAGE,
} from '@/lib/data/fidelity';

interface FidelityModalProps {
  open: boolean;
  onClose: () => void;
}

export function FidelityModal({ open, onClose }: FidelityModalProps) {
  const latestProgress = FIDELITY_PROGRESS[FIDELITY_PROGRESS.length - 1];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Implementation Fidelity
          </DialogTitle>
          <p className="mt-2 text-sm text-gray-600">
            Willow Curriculum Progress - 2024-2025 School Year
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overall Summary */}
          <Card className="bg-purple-50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                  Overall Implementation Progress
                </p>
                <p className="text-4xl font-bold text-gray-900">
                  {TOTAL_LESSONS_UNLOCKED} <span className="text-2xl text-gray-600">of {TOTAL_LESSONS}</span>
                </p>
                <p className="mt-2 text-lg font-semibold text-purple-700">
                  {OVERALL_PERCENTAGE}% Complete
                </p>
              </div>
              <div className="text-right">
                <div className="mb-4">
                  <div className="relative w-32 h-32 rounded-full bg-white border-4 border-purple-200 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-purple-600">{OVERALL_PERCENTAGE}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Progress Over Time */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-600">
              Progress Timeline
            </h3>
            <Card className="p-4 bg-gray-50">
              <div className="space-y-3">
                {FIDELITY_PROGRESS.map((progress, idx) => {
                  const isLatest = idx === FIDELITY_PROGRESS.length - 1;
                  const barWidth = (progress.percentage / 100) * 100;

                  return (
                    <div key={progress.date} className={isLatest ? 'ring-2 ring-purple-400 p-2 rounded' : ''}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-medium ${isLatest ? 'font-bold text-purple-700' : 'text-gray-700'}`}>
                          {progress.date}
                        </span>
                        <span className={`text-sm ${isLatest ? 'font-bold text-purple-700' : 'text-gray-600'}`}>
                          {progress.lessonsUnlocked} / {progress.totalLessons} ({progress.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${isLatest ? 'bg-purple-600' : 'bg-purple-400'}`}
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* By Grade Level */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-600">
              Implementation by Grade Level
            </h3>
            <div className="space-y-3">
              {GRADE_FIDELITY.map((grade) => (
                <Card key={grade.grade} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">Grade {grade.grade}</span>
                    <span className="text-sm font-semibold text-gray-700">
                      {grade.lessonsUnlocked} / {grade.totalLessons} ({grade.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all"
                      style={{ width: `${grade.percentage}%` }}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          <Card className="bg-blue-50 p-4">
            <p className="font-semibold text-gray-900 mb-2">Key Insights</p>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Grades 9-10 are ahead of schedule at 89-90% completion</li>
              <li>• Grade 12 needs additional support (55% completion)</li>
              <li>• Overall progress is on track to reach 85% by end of December</li>
              <li>• 7 lessons unlocked in the past 2 weeks</li>
            </ul>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
