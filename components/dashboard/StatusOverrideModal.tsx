'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface StatusOverrideModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  studentName: string;
}

export function StatusOverrideModal({
  open,
  onClose,
  onConfirm,
  studentName,
}: StatusOverrideModalProps) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (reason.trim()) {
      onConfirm(reason);
      setReason('');
      onClose();
    }
  };

  const handleCancel = () => {
    setReason('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Override Student Status</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-600">
            Provide a reason for overriding {studentName}'s status. This will be visible to other counselors.
          </p>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-700">Override Reason *</p>
            <Textarea
              placeholder="Example: Exempt from Resume Unit until Nov 1 due to work schedule"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
            />
            <p className="text-xs text-gray-500">
              Be specific about what is being overridden and why. Include any expiration dates if applicable.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!reason.trim()}
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            Apply Override
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
