'use client';

import { Scholarship, FAFSAStatus, FinancialAidMilestone } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  calculateTotalScholarships,
  getFAFSAStatusText,
  getMilestoneStatusDisplay,
  daysUntilDeadline,
  formatDaysUntilDeadline,
} from '@/lib/data/studentFinancialAid';

interface FinancialAidCardProps {
  fafsaStatus?: FAFSAStatus;
  scholarships?: Scholarship[];
  financialAidMilestones?: FinancialAidMilestone[];
}

export function FinancialAidCard({
  fafsaStatus = 'not-started',
  scholarships = [],
  financialAidMilestones = [],
}: FinancialAidCardProps) {
  const fafsaDisplay = getFAFSAStatusText(fafsaStatus);
  const totals = calculateTotalScholarships(scholarships);

  // Find the award comparison deadline
  const awardDeadline = financialAidMilestones.find(m => m.type === 'award-comparison');
  const daysUntilAward = awardDeadline ? daysUntilDeadline(awardDeadline.dueDate) : null;
  const isAwardDeadlineUrgent = awardDeadline && awardDeadline.isUrgent;

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600">
        Financial Aid Status
      </h3>

      {/* FAFSA Status Card */}
      <Card className="bg-blue-50 p-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{fafsaDisplay.icon}</span>
            <div>
              <p className="font-semibold text-gray-900">FAFSA Application</p>
              <p className="text-sm text-gray-600">{fafsaDisplay.text}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Scholarships & Awards */}
      {scholarships.length > 0 ? (
        <div className="space-y-2">
          <Card className="bg-green-50 p-3">
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-gray-900">Financial Aid Awarded</p>
              </div>

              {/* Aid Summary */}
              <div className="space-y-2 text-sm">
                {totals.scholarships > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Scholarships:</span>
                    <span className="font-semibold text-gray-900">
                      ${totals.scholarships.toLocaleString()}
                    </span>
                  </div>
                )}
                {totals.grants > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Grants:</span>
                    <span className="font-semibold text-gray-900">
                      ${totals.grants.toLocaleString()}
                    </span>
                  </div>
                )}
                {totals.loans > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Federal Loans:</span>
                    <span className="font-semibold text-gray-900">
                      ${totals.loans.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="border-t border-green-200 pt-2 flex justify-between items-center font-semibold">
                  <span className="text-gray-900">Total Aid Package:</span>
                  <span className="text-lg text-green-700">
                    ${totals.total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Individual Awards List */}
              <div className="space-y-2 mt-3 border-t border-green-200 pt-3">
                {scholarships.map(scholarship => (
                  <div key={scholarship.id} className="text-xs space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{scholarship.name}</p>
                        <p className="text-gray-600 capitalize">
                          {scholarship.source === 'university'
                            ? 'University Scholarship'
                            : scholarship.source === 'external'
                            ? 'External Award'
                            : scholarship.source === 'grant'
                            ? 'Federal/State Grant'
                            : 'Federal Loan'}
                        </p>
                        {scholarship.awardedDate && (
                          <p className="text-gray-500">
                            Awarded:{' '}
                            {new Date(scholarship.awardedDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                        )}
                      </div>
                      <span className="font-semibold text-gray-900 whitespace-nowrap">
                        ${scholarship.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <Card className="bg-gray-50 p-3 text-center">
          <p className="text-sm text-gray-600">No financial aid awards received yet</p>
        </Card>
      )}

      {/* Critical Deadline - Award Comparison */}
      {awardDeadline && (
        <Card
          className={`p-3 ${
            isAwardDeadlineUrgent
              ? 'bg-red-50 border-red-200'
              : awardDeadline.status === 'completed'
              ? 'bg-green-50 border-green-200'
              : 'bg-amber-50 border-amber-200'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">
                    {isAwardDeadlineUrgent ? '🚨' : awardDeadline.status === 'completed' ? '✅' : '📅'}
                  </span>
                  <p className="font-semibold text-gray-900">Award Comparison Deadline</p>
                </div>
                <p className="text-sm text-gray-600">
                  {new Date(awardDeadline.dueDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
              {daysUntilAward !== null && (
                <Badge
                  className={
                    daysUntilAward < 0
                      ? 'bg-red-100 text-red-900'
                      : daysUntilAward <= 7
                      ? 'bg-red-100 text-red-900'
                      : daysUntilAward <= 30
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-gray-100 text-gray-900'
                  }
                >
                  {formatDaysUntilDeadline(daysUntilAward)}
                </Badge>
              )}
            </div>

            {daysUntilAward !== null && (
              <p className="text-xs text-gray-600">
                {isAwardDeadlineUrgent ? (
                  <span className="font-semibold">
                    {daysUntilAward < 0
                      ? `This deadline has passed. Student should respond to all acceptances immediately.`
                      : `This is a critical deadline. Student must respond to acceptances by this date.`}
                  </span>
                ) : awardDeadline.status === 'completed' ? (
                  'Completed - all comparisons done'
                ) : (
                  'Student should compare financial aid packages and commit to a school'
                )}
              </p>
            )}
          </div>
        </Card>
      )}

      {/* Other Financial Aid Milestones */}
      {financialAidMilestones.length > 1 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Timeline</p>
          {financialAidMilestones
            .filter(m => m.type !== 'award-comparison')
            .map((milestone, idx) => {
              const display = getMilestoneStatusDisplay(milestone);
              const daysLeft = daysUntilDeadline(milestone.dueDate);

              return (
                <Card key={idx} className={`p-2 text-xs ${display.color}`}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <span>{display.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 capitalize">
                          {milestone.type === 'fafsa-submission'
                            ? 'FAFSA Submission'
                            : milestone.type === 'fafsa-processing'
                            ? 'FAFSA Processing'
                            : 'Award Comparison'}
                        </p>
                        <p className="text-gray-600">
                          {new Date(milestone.dueDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <Badge className={`text-xs whitespace-nowrap ${display.color}`}>
                      {display.label}
                    </Badge>
                  </div>
                </Card>
              );
            })}
        </div>
      )}

      {/* No Data State */}
      {scholarships.length === 0 && financialAidMilestones.length === 0 && (
        <Card className="bg-gray-50 p-3 text-center">
          <p className="text-sm text-gray-600">No financial aid information tracked yet</p>
        </Card>
      )}
    </div>
  );
}
