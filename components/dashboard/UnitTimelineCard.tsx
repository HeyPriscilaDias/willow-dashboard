'use client';

import { Unit } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArtifactCard } from '@/components/dashboard/ArtifactCard';

interface UnitTimelineCardProps {
  units: Unit[];
}

const STATUS_ICONS: Record<string, string> = {
  'not-started': '⏸️',
  'in-progress': '⏳',
  'overdue': '⚠️',
  'completed': '✅',
};

const STATUS_COLORS: Record<string, string> = {
  'not-started': 'bg-gray-50 border-gray-200',
  'in-progress': 'bg-blue-50 border-blue-200',
  'overdue': 'bg-red-50 border-red-300',
  'completed': 'bg-green-50 border-green-200',
};

export function UnitTimelineCard({ units }: UnitTimelineCardProps) {
  if (!units || units.length === 0) {
    return null;
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600">
        Curriculum Timeline
      </h3>
      {units.map((unit) => (
        <Card
          key={unit.unitNumber}
          className={`border p-3 ${STATUS_COLORS[unit.status]}`}
        >
          <div className="space-y-2">
            {/* Unit Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{STATUS_ICONS[unit.status]}</span>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Unit {unit.unitNumber}: {unit.title}
                    </p>
                    <p className="text-xs text-gray-600">
                      Due: {formatDate(unit.dueDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Overdue Indicator */}
            {unit.status === 'overdue' && unit.daysSinceOverdue !== undefined && (
              <div className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                ⏰ OVERDUE {unit.daysSinceOverdue} days
              </div>
            )}

            {/* Status Description */}
            <p className="text-xs text-gray-700">
              {unit.status === 'not-started' && 'Not yet started'}
              {unit.status === 'in-progress' && 'Currently in progress'}
              {unit.status === 'overdue' && `${unit.artifacts?.filter(a => a.status === 'needed').length || 0} artifacts not yet submitted`}
              {unit.status === 'completed' && 'All requirements completed'}
            </p>

            {/* Artifacts with Quality Feedback */}
            {unit.artifacts && unit.artifacts.length > 0 && (
              <div className="pt-2 space-y-2">
                <p className="text-xs font-semibold text-gray-600">Artifacts:</p>
                {unit.artifacts.map((artifact) => (
                  <ArtifactCard
                    key={artifact.id}
                    artifact={artifact}
                    unitNumber={unit.unitNumber}
                  />
                ))}
              </div>
            )}

            {/* Action Buttons */}
            {unit.status === 'overdue' && (
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                >
                  📧 Contact student about Unit {unit.unitNumber}
                </Button>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
