'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SentimentAlertCardProps {
  excerpt?: string;
  onContactCounselor?: () => void;
  onEscalate?: () => void;
  onDocument?: () => void;
}

export function SentimentAlertCard({
  excerpt = 'Concerning content detected in student reflection',
  onContactCounselor,
  onEscalate,
  onDocument,
}: SentimentAlertCardProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-red-700">
        🚨 Safety Concern - Requires Immediate Action
      </h3>
      <Card className="border-2 border-red-300 bg-red-50 p-4">
        <div className="space-y-3">
          {/* Heading */}
          <div>
            <p className="text-sm font-bold text-red-900">
              Sentiment Alert Detected
            </p>
            <p className="text-xs text-red-800 mt-1">
              Content suggests student may need support or referral to counseling services
            </p>
          </div>

          {/* Content Excerpt */}
          {excerpt && (
            <div className="rounded bg-white p-3 border border-red-200">
              <p className="text-xs font-semibold text-gray-700 mb-1">Concerning Content:</p>
              <p className="text-xs italic text-gray-900">
                "{excerpt}"
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <Button
              onClick={onContactCounselor}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-sm"
            >
              📞 Contact Counselor Now
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={onEscalate}
                variant="outline"
                className="text-sm border-red-300 text-red-700 hover:bg-red-50"
              >
                ⬆️ Escalate to Admin
              </Button>
              <Button
                onClick={onDocument}
                variant="outline"
                className="text-sm border-red-300 text-red-700 hover:bg-red-50"
              >
                📝 Document & Monitor
              </Button>
            </div>
          </div>

          {/* Info */}
          <p className="text-xs text-red-700 pt-2 border-t border-red-200">
            This alert prioritizes student safety and wellbeing. Immediate staff review is recommended.
          </p>
        </div>
      </Card>
    </div>
  );
}
