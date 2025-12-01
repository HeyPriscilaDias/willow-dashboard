'use client';

import { College } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { calculateCollegeBalance, getCollegeBalanceMessage, isCollegeListBalanced } from '@/lib/data/studentColleges';

interface CollegeListCardProps {
  colleges: College[];
}

const STATUS_ICONS: Record<string, string> = {
  interested: '👀',
  applied: '✉️',
  accepted: '🎓',
  rejected: '❌',
  waitlisted: '⏳',
};

const TYPE_COLORS: Record<string, { bg: string; text: string; badge: string }> = {
  reach: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    badge: 'bg-red-100 text-red-900',
  },
  target: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-900',
  },
  safety: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    badge: 'bg-green-100 text-green-900',
  },
};

export function CollegeListCard({ colleges }: CollegeListCardProps) {
  if (!colleges || colleges.length === 0) {
    return (
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600">
          Post-Secondary Planning
        </h3>
        <Card className="bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-600">No college list yet</p>
        </Card>
      </div>
    );
  }

  const balance = calculateCollegeBalance(colleges);
  const isBalanced = isCollegeListBalanced(colleges);
  const balanceMessage = getCollegeBalanceMessage(colleges);

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600">
        Post-Secondary Planning
      </h3>

      {/* Balance Summary */}
      <Card
        className={`p-3 ${
          isBalanced ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'
        }`}
      >
        <div className="space-y-2">
          {/* Balance Counts */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-gray-700">Balance:</span>
            <Badge className="bg-red-100 text-red-900">{balance.reach} Reach</Badge>
            <Badge className="bg-amber-100 text-amber-900">{balance.target} Target</Badge>
            <Badge className="bg-green-100 text-green-900">{balance.safety} Safety</Badge>
          </div>

          {/* Balance Message */}
          <p
            className={`text-xs font-medium ${
              isBalanced ? 'text-green-800' : 'text-amber-800'
            }`}
          >
            {isBalanced ? '✅' : '⚠️'} {balanceMessage}
          </p>
        </div>
      </Card>

      {/* College List Table */}
      <div className="space-y-2">
        {colleges.map((college) => {
          const colors = TYPE_COLORS[college.type];
          const statusIcon = STATUS_ICONS[college.appliedStatus];

          return (
            <Card key={college.id} className={`p-3 border ${colors.bg}`}>
              <div className="space-y-2">
                {/* College Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{statusIcon}</span>
                      <div>
                        <p className="font-semibold text-gray-900">{college.name}</p>
                        <p className={`text-xs ${colors.text}`}>
                          {college.acceptanceRate}% acceptance rate
                        </p>
                      </div>
                    </div>
                  </div>
                  <Badge className={colors.badge}>
                    {college.type.charAt(0).toUpperCase() + college.type.slice(1)}
                  </Badge>
                </div>

                {/* Status & Dates */}
                <div className="text-xs text-gray-700 space-y-1">
                  <div>
                    <span className="font-semibold">Status:</span>{' '}
                    <span className="capitalize">{college.appliedStatus}</span>
                  </div>
                  {college.appliedDate && (
                    <div>
                      <span className="font-semibold">Applied:</span> {new Date(college.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  )}
                  {college.decisionDate && (
                    <div>
                      <span className="font-semibold">Decision:</span> {new Date(college.decisionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Additional Context */}
      <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded border border-gray-200">
        <p className="font-semibold mb-1">💡 Reach/Target/Safety Explained:</p>
        <ul className="space-y-1">
          <li>
            <strong className="text-red-700">Reach:</strong> &lt;10% acceptance rate
          </li>
          <li>
            <strong className="text-amber-700">Target:</strong> 10-50% acceptance rate
          </li>
          <li>
            <strong className="text-green-700">Safety:</strong> &gt;50% acceptance rate
          </li>
        </ul>
      </div>
    </div>
  );
}
