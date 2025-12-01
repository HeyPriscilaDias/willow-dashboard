import { Scholarship, FAFSAStatus, FinancialAidMilestone } from '@/lib/types';

// Sample financial aid data for 12th graders
export const STUDENT_FINANCIAL_AID: Record<number, {
  fafsaStatus: FAFSAStatus;
  scholarships: Scholarship[];
  financialAidMilestones: FinancialAidMilestone[];
}> = {
  // Sarah Johnson (ID 3) - FAFSA submitted, waiting for processing
  3: {
    fafsaStatus: 'submitted',
    scholarships: [],
    financialAidMilestones: [
      {
        type: 'fafsa-submission',
        dueDate: '2024-12-31',
        status: 'completed',
        isUrgent: false,
      },
      {
        type: 'fafsa-processing',
        dueDate: '2025-03-15',
        status: 'approaching',
        isUrgent: false,
      },
      {
        type: 'award-comparison',
        dueDate: '2025-05-01',
        status: 'pending',
        isUrgent: true, // 152 days away but critical milestone
      },
    ],
  },

  // Jessica Williams (ID 7) - FAFSA processed, scholarships awarded
  7: {
    fafsaStatus: 'processed',
    scholarships: [
      {
        id: 'S7-1',
        name: 'Pomona Merit Scholarship',
        amount: 25000,
        source: 'university',
        awardedDate: '2025-03-30',
        acceptanceDeadline: '2025-05-01',
      },
      {
        id: 'S7-2',
        name: 'California Grant (Cal Grant A)',
        amount: 12000,
        source: 'grant',
        awardedDate: '2025-04-10',
        acceptanceDeadline: '2025-05-01',
      },
      {
        id: 'S7-3',
        name: 'University of Michigan Scholarship',
        amount: 18000,
        source: 'university',
        awardedDate: '2025-03-25',
        acceptanceDeadline: '2025-05-01',
      },
      {
        id: 'S7-4',
        name: 'Federal Student Loan (Stafford)',
        amount: 5500,
        source: 'loan',
        awardedDate: '2025-04-05',
        acceptanceDeadline: '2025-05-01',
      },
    ],
    financialAidMilestones: [
      {
        type: 'fafsa-submission',
        dueDate: '2024-12-31',
        status: 'completed',
        isUrgent: false,
      },
      {
        type: 'fafsa-processing',
        dueDate: '2025-03-15',
        status: 'completed',
        isUrgent: false,
      },
      {
        type: 'award-comparison',
        dueDate: '2025-05-01',
        status: 'due-soon',
        isUrgent: true, // 152 days away but coming up
      },
    ],
  },

  // Morgan Walsh (ID 12) - FAFSA in progress, no awards yet
  12: {
    fafsaStatus: 'in-progress',
    scholarships: [],
    financialAidMilestones: [
      {
        type: 'fafsa-submission',
        dueDate: '2024-12-31',
        status: 'approaching',
        isUrgent: true, // Critical - only 30 days away
      },
      {
        type: 'fafsa-processing',
        dueDate: '2025-03-15',
        status: 'pending',
        isUrgent: false,
      },
      {
        type: 'award-comparison',
        dueDate: '2025-05-01',
        status: 'pending',
        isUrgent: true,
      },
    ],
  },
};

/**
 * Get financial aid data for a specific student
 */
export function getStudentFinancialAid(studentId: number) {
  return STUDENT_FINANCIAL_AID[studentId] || {
    fafsaStatus: 'not-started' as FAFSAStatus,
    scholarships: [],
    financialAidMilestones: [],
  };
}

/**
 * Calculate total awarded scholarships
 */
export function calculateTotalScholarships(scholarships: Scholarship[]): {
  grants: number;
  scholarships: number;
  loans: number;
  total: number;
} {
  const grants = scholarships
    .filter(s => s.source === 'grant')
    .reduce((sum, s) => sum + s.amount, 0);
  const scholarshipAmount = scholarships
    .filter(s => s.source === 'university' || s.source === 'external')
    .reduce((sum, s) => sum + s.amount, 0);
  const loans = scholarships
    .filter(s => s.source === 'loan')
    .reduce((sum, s) => sum + s.amount, 0);

  return {
    grants,
    scholarships: scholarshipAmount,
    loans,
    total: grants + scholarshipAmount + loans,
  };
}

/**
 * Get FAFSA status display text
 */
export function getFAFSAStatusText(status: FAFSAStatus): { text: string; icon: string } {
  const statusMap = {
    'not-started': { text: 'Not Started', icon: '⏹️' },
    'in-progress': { text: 'In Progress', icon: '⏳' },
    'submitted': { text: 'Submitted', icon: '✅' },
    'processed': { text: 'Processed', icon: '✅' },
  };
  return statusMap[status] || { text: 'Unknown', icon: '❓' };
}

/**
 * Get milestone status display
 */
export function getMilestoneStatusDisplay(
  milestone: FinancialAidMilestone,
): { label: string; color: string; icon: string } {
  if (milestone.status === 'completed') {
    return { label: 'Completed', color: 'bg-green-50', icon: '✅' };
  }
  if (milestone.status === 'overdue') {
    return { label: 'OVERDUE', color: 'bg-red-50', icon: '🚨' };
  }
  if (milestone.isUrgent) {
    return { label: 'Urgent', color: 'bg-red-50', icon: '⚠️' };
  }
  if (milestone.status === 'due-soon') {
    return { label: 'Due Soon', color: 'bg-amber-50', icon: '⏰' };
  }
  if (milestone.status === 'approaching') {
    return { label: 'Approaching', color: 'bg-amber-50', icon: '📅' };
  }
  return { label: 'Pending', color: 'bg-gray-50', icon: '⏳' };
}

/**
 * Calculate days until deadline
 */
export function daysUntilDeadline(dueDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  const diff = due.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Format days until deadline for display
 */
export function formatDaysUntilDeadline(daysLeft: number): string {
  if (daysLeft < 0) {
    const daysOverdue = Math.abs(daysLeft);
    return `OVERDUE - ${daysOverdue} day${daysOverdue === 1 ? '' : 's'} late`;
  }
  if (daysLeft === 0) {
    return 'DUE TODAY';
  }
  if (daysLeft === 1) {
    return 'Due tomorrow';
  }
  if (daysLeft <= 7) {
    return `Due in ${daysLeft} days (urgent)`;
  }
  return `Due in ${daysLeft} days`;
}
