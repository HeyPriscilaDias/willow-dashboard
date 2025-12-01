'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StatusOverrideData {
  reason: string;
  setBy?: string;
  setDate?: string;
  expiresDate?: string;
}

interface StatusOverrideCardProps {
  override: StatusOverrideData;
  onRemove: () => void;
}

export function StatusOverrideCard({ override, onRemove }: StatusOverrideCardProps) {
  return (
    <Card className="border-l-4 border-l-cyan-600 bg-cyan-50 p-3">
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="font-semibold text-cyan-900">🔄 Status Manually Overridden</p>
            {override.setBy && override.setDate && (
              <p className="text-xs text-cyan-700">
                by {override.setBy} on {override.setDate}
              </p>
            )}
          </div>
        </div>

        <div className="rounded bg-white px-2 py-1 border border-cyan-200">
          <p className="text-xs text-cyan-900 font-medium">Reason:</p>
          <p className="text-xs text-cyan-800 mt-1">{override.reason}</p>
          {override.expiresDate && (
            <p className="text-xs text-cyan-700 mt-1 font-semibold">
              ⏰ Expires: {override.expiresDate}
            </p>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onRemove}
          className="w-full text-xs"
        >
          ✕ Remove Override
        </Button>
      </div>
    </Card>
  );
}
