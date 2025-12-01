'use client';

import { PostSecondaryPath, PostSecondaryPathType } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AlternativePathCardProps {
  path: PostSecondaryPath;
}

const PATH_CONFIG: Record<PostSecondaryPathType, { icon: string; label: string; color: string }> = {
  'college': {
    icon: '🎓',
    label: 'College',
    color: 'bg-blue-50 border-blue-200'
  },
  'apprenticeship': {
    icon: '🔧',
    label: 'Apprenticeship',
    color: 'bg-orange-50 border-orange-200'
  },
  'trade-school': {
    icon: '🏗️',
    label: 'Trade School',
    color: 'bg-amber-50 border-amber-200'
  },
  'military': {
    icon: '🎖️',
    label: 'Military',
    color: 'bg-red-50 border-red-200'
  },
  'gap-year': {
    icon: '🌍',
    label: 'Gap Year',
    color: 'bg-green-50 border-green-200'
  },
  'work': {
    icon: '💼',
    label: 'Work',
    color: 'bg-purple-50 border-purple-200'
  }
};

const STATUS_COLOR: Record<string, string> = {
  'interested': 'text-blue-700 bg-blue-100',
  'applied': 'text-amber-700 bg-amber-100',
  'accepted': 'text-green-700 bg-green-100',
  'enrolled': 'text-green-700 bg-green-100 font-bold'
};

export function AlternativePathCard({ path }: AlternativePathCardProps) {
  const config = PATH_CONFIG[path.type];

  return (
    <Card className={`border p-4 ${config.color}`}>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{config.icon}</span>
            <div>
              <p className="font-semibold text-gray-900">{config.label}</p>
              {path.program && (
                <p className="text-sm text-gray-700 mt-1">{path.program}</p>
              )}
            </div>
          </div>
          <span className={`text-xs font-semibold px-2 py-1 rounded ${STATUS_COLOR[path.status]}`}>
            {path.status === 'interested' && '💭 Interested'}
            {path.status === 'applied' && '📝 Applied'}
            {path.status === 'accepted' && '✅ Accepted'}
            {path.status === 'enrolled' && '📍 Enrolled'}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700">
          {path.status === 'interested' && 'Student is interested in this path. Next step: Submit application.'}
          {path.status === 'applied' && 'Application submitted. Awaiting decision from program.'}
          {path.status === 'accepted' && 'Offer accepted! Student can enroll when ready.'}
          {path.status === 'enrolled' && 'Student is currently enrolled in this program.'}
        </p>

        {/* Status Note for Strategy Flag */}
        {path.status === 'applied' && (
          <div className="rounded bg-amber-100 px-2 py-1 border border-amber-300">
            <p className="text-xs text-amber-900">
              ⏰ Check in with student about application status
            </p>
          </div>
        )}

        {/* Action Button */}
        <div>
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs"
          >
            📝 Update Alternative Path Status
          </Button>
        </div>
      </div>
    </Card>
  );
}
