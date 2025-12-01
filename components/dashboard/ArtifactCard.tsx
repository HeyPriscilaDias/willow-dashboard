'use client';

import { Artifact } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ArtifactCardProps {
  artifact: Artifact;
  unitNumber: number;
}

const STATUS_CONFIG: Record<string, { icon: string; bgColor: string; textColor: string; label: string }> = {
  'needed': {
    icon: '❌',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-700',
    label: 'Not yet submitted',
  },
  'submitted': {
    icon: '📤',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    label: 'Submitted',
  },
  'in-review': {
    icon: '👁️',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    label: 'Under review',
  },
  'needs-revision': {
    icon: '✏️',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    label: 'Needs revision',
  },
  'accepted': {
    icon: '✅',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    label: 'Accepted',
  },
};

function getQualityColor(score: number | undefined): string {
  if (score === undefined) return 'text-gray-600';
  if (score >= 80) return 'text-green-600 font-bold';
  if (score >= 60) return 'text-blue-600 font-bold';
  if (score >= 40) return 'text-amber-600 font-bold';
  return 'text-red-600 font-bold';
}

function getQualityBgColor(score: number | undefined): string {
  if (score === undefined) return 'bg-gray-100';
  if (score >= 80) return 'bg-green-100';
  if (score >= 60) return 'bg-blue-100';
  if (score >= 40) return 'bg-amber-100';
  return 'bg-red-100';
}

const formatDate = (dateStr: string | undefined) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export function ArtifactCard({ artifact, unitNumber }: ArtifactCardProps) {
  const status = STATUS_CONFIG[artifact.status] || STATUS_CONFIG['needed'];

  return (
    <Card className={`border p-3 ${status.bgColor}`}>
      <div className="space-y-2">
        {/* Header: Title & Status */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">{status.icon}</span>
              <div>
                <p className={`font-semibold ${status.textColor}`}>{artifact.title}</p>
                {artifact.fileName && (
                  <p className="text-xs text-gray-600">📄 {artifact.fileName}</p>
                )}
              </div>
            </div>
          </div>
          {/* Quality Score Badge */}
          {artifact.qualityScore !== undefined && (
            <div className={`rounded px-2 py-1 text-center ${getQualityBgColor(artifact.qualityScore)}`}>
              <p className={`text-sm font-bold ${getQualityColor(artifact.qualityScore)}`}>
                {artifact.qualityScore}/100
              </p>
            </div>
          )}
        </div>

        {/* Submission Date */}
        {artifact.submittedDate && (
          <p className="text-xs text-gray-600">
            Submitted: {formatDate(artifact.submittedDate)}
          </p>
        )}

        {/* Feedback Section - Only show if present */}
        {artifact.feedback && (
          <div className="rounded bg-white px-2 py-2 border border-gray-200">
            <p className="text-xs font-semibold text-gray-700 mb-1">Feedback:</p>
            <p className="text-xs text-gray-700 leading-relaxed">
              {artifact.feedback}
            </p>
          </div>
        )}

        {/* Reason (for "Needs Revision" artifacts) */}
        {artifact.reason && artifact.status === 'needs-revision' && (
          <div className="rounded bg-amber-100 px-2 py-1 border border-amber-300">
            <p className="text-xs font-semibold text-amber-900">
              Reason: {artifact.reason}
            </p>
          </div>
        )}

        {/* Action Buttons - Show for "needs-revision" status */}
        {artifact.status === 'needs-revision' && (
          <div className="pt-2 space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
            >
              📧 Contact Student About Revision
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
            >
              📝 View Full Feedback
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
