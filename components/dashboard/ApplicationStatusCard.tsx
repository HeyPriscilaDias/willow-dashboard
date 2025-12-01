'use client';

import { Application } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { calculateApplicationStatus } from '@/lib/data/studentApplications';

interface ApplicationStatusCardProps {
  applications: Application[];
}

const STATUS_ICONS: Record<string, string> = {
  submitted: '✉️',
  pending: '⏳',
  accepted: '🎓',
  rejected: '❌',
  waitlisted: '⏳',
};

const STATUS_COLORS: Record<string, { bg: string; text: string; badge: string }> = {
  submitted: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-900',
  },
  pending: {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    badge: 'bg-gray-100 text-gray-900',
  },
  accepted: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    badge: 'bg-green-100 text-green-900',
  },
  rejected: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    badge: 'bg-red-100 text-red-900',
  },
  waitlisted: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-900',
  },
};

export function ApplicationStatusCard({ applications }: ApplicationStatusCardProps) {
  if (!applications || applications.length === 0) {
    return (
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600">
          Application Status
        </h3>
        <Card className="bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-600">No applications tracked yet</p>
        </Card>
      </div>
    );
  }

  const status = calculateApplicationStatus(applications);

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600">
        Application Status
      </h3>

      {/* Summary Counts */}
      <Card className="bg-blue-50 p-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-gray-700">Progress:</span>
            <Badge className="bg-blue-100 text-blue-900">{status.submitted} Submitted</Badge>
            <Badge className="bg-gray-100 text-gray-900">{status.pending} Pending</Badge>
            <Badge className="bg-green-100 text-green-900">{status.accepted} Accepted</Badge>
            {status.rejected > 0 && (
              <Badge className="bg-red-100 text-red-900">{status.rejected} Rejected</Badge>
            )}
            {status.waitlisted > 0 && (
              <Badge className="bg-amber-100 text-amber-900">{status.waitlisted} Waitlisted</Badge>
            )}
          </div>
          <p className="text-xs text-blue-800">
            {status.decisions} of {status.total} schools have made decisions
          </p>
        </div>
      </Card>

      {/* Application List */}
      <div className="space-y-2">
        {applications.map((app) => {
          const colors = STATUS_COLORS[app.status];
          const icon = STATUS_ICONS[app.status];

          return (
            <Card key={app.id} className={`p-3 border ${colors.bg}`}>
              <div className="space-y-2">
                {/* Application Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{icon}</span>
                      <div>
                        <p className="font-semibold text-gray-900">{app.schoolName}</p>
                        <p className={`text-xs ${colors.text}`}>
                          Submitted{' '}
                          {new Date(app.submittedDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Badge className={colors.badge}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </Badge>
                </div>

                {/* Status & Decision Details */}
                <div className="text-xs text-gray-700 space-y-1">
                  {app.decisionType && (
                    <div>
                      <span className="font-semibold">Type:</span>{' '}
                      <span className="capitalize">{app.decisionType.replace('-', ' ')}</span>
                    </div>
                  )}
                  {app.decisionDate && (
                    <div>
                      <span className="font-semibold">Decision:</span>{' '}
                      {new Date(app.decisionDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Application Timeline Info */}
      {status.decisions < status.total && (
        <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded border border-gray-200">
          <p className="font-semibold mb-1">📅 Waiting for Decisions:</p>
          <p>
            {status.total - status.decisions} school{status.total - status.decisions > 1 ? 's' : ''} still pending decisions.
            Most colleges notify by May 1.
          </p>
        </div>
      )}
    </div>
  );
}
