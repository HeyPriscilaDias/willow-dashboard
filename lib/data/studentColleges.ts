import { College } from '@/lib/types';

// Sample college lists for students by ID
export const STUDENT_COLLEGES: Record<number, College[]> = {
  // Sarah Johnson (Grade 12) - Scenario 3: Ivy League Risk (all reach schools)
  3: [
    {
      id: 'C3-1',
      name: 'Stanford University',
      acceptanceRate: 3.7,
      type: 'reach',
      appliedStatus: 'applied',
      appliedDate: '2024-01-15',
    },
    {
      id: 'C3-2',
      name: 'MIT',
      acceptanceRate: 3.2,
      type: 'reach',
      appliedStatus: 'applied',
      appliedDate: '2024-01-16',
    },
    {
      id: 'C3-3',
      name: 'Harvard University',
      acceptanceRate: 3.2,
      type: 'reach',
      appliedStatus: 'applied',
      appliedDate: '2024-01-17',
    },
    {
      id: 'C3-4',
      name: 'Yale University',
      acceptanceRate: 4.4,
      type: 'reach',
      appliedStatus: 'applied',
      appliedDate: '2024-01-18',
    },
    {
      id: 'C3-5',
      name: 'Princeton University',
      acceptanceRate: 3.1,
      type: 'reach',
      appliedStatus: 'applied',
      appliedDate: '2024-01-19',
    },
    {
      id: 'C3-6',
      name: 'University of Pennsylvania',
      acceptanceRate: 3.2,
      type: 'reach',
      appliedStatus: 'applied',
      appliedDate: '2024-01-20',
    },
    {
      id: 'C3-7',
      name: 'Columbia University',
      acceptanceRate: 3.6,
      type: 'reach',
      appliedStatus: 'applied',
      appliedDate: '2024-01-21',
    },
    {
      id: 'C3-8',
      name: 'Northwestern University',
      acceptanceRate: 7.3,
      type: 'reach',
      appliedStatus: 'applied',
      appliedDate: '2024-01-22',
    },
  ],

  // Jessica Williams (Grade 12) - Balanced college list (good example)
  7: [
    {
      id: 'C7-1',
      name: 'Pomona College',
      acceptanceRate: 7.5,
      type: 'reach',
      appliedStatus: 'applied',
      appliedDate: '2024-01-10',
      decisionDate: '2024-03-30',
    },
    {
      id: 'C7-2',
      name: 'University of Michigan',
      acceptanceRate: 20,
      type: 'target',
      appliedStatus: 'applied',
      appliedDate: '2024-01-12',
    },
    {
      id: 'C7-3',
      name: 'University of Wisconsin-Madison',
      acceptanceRate: 52,
      type: 'target',
      appliedStatus: 'applied',
      appliedDate: '2024-01-14',
    },
    {
      id: 'C7-4',
      name: 'Indiana University',
      acceptanceRate: 78,
      type: 'safety',
      appliedStatus: 'applied',
      appliedDate: '2024-01-08',
      decisionDate: '2024-03-15',
    },
    {
      id: 'C7-5',
      name: 'Purdue University',
      acceptanceRate: 50,
      type: 'safety',
      appliedStatus: 'applied',
      appliedDate: '2024-01-09',
      decisionDate: '2024-03-20',
    },
  ],

  // Morgan Walsh (Grade 12) - Another balanced example
  12: [
    {
      id: 'C12-1',
      name: 'UC Berkeley',
      acceptanceRate: 9.5,
      type: 'reach',
      appliedStatus: 'applied',
      appliedDate: '2024-11-15',
    },
    {
      id: 'C12-2',
      name: 'UCLA',
      acceptanceRate: 9,
      type: 'reach',
      appliedStatus: 'applied',
      appliedDate: '2024-11-16',
    },
    {
      id: 'C12-3',
      name: 'UC San Diego',
      acceptanceRate: 28,
      type: 'target',
      appliedStatus: 'applied',
      appliedDate: '2024-11-17',
    },
    {
      id: 'C12-4',
      name: 'UC Santa Barbara',
      acceptanceRate: 32,
      type: 'target',
      appliedStatus: 'applied',
      appliedDate: '2024-11-18',
    },
    {
      id: 'C12-5',
      name: 'Cal Poly San Luis Obispo',
      acceptanceRate: 25,
      type: 'target',
      appliedStatus: 'applied',
      appliedDate: '2024-11-19',
    },
    {
      id: 'C12-6',
      name: 'UC Davis',
      acceptanceRate: 39,
      type: 'safety',
      appliedStatus: 'applied',
      appliedDate: '2024-11-14',
    },
  ],
};

/**
 * Get college list for a specific student
 */
export function getStudentColleges(studentId: number): College[] {
  return STUDENT_COLLEGES[studentId] || [];
}

/**
 * Calculate college list balance: returns counts of reach/target/safety
 */
export function calculateCollegeBalance(colleges: College[]) {
  const reach = colleges.filter(c => c.type === 'reach').length;
  const target = colleges.filter(c => c.type === 'target').length;
  const safety = colleges.filter(c => c.type === 'safety').length;

  return { reach, target, safety, total: colleges.length };
}

/**
 * Check if college list is balanced
 * Ideal: 1-2 reach, 2-3 target, 1-2 safety
 */
export function isCollegeListBalanced(colleges: College[]): boolean {
  const balance = calculateCollegeBalance(colleges);

  if (balance.total === 0) return false;

  // Rule: Need at least 1 safety, at least 1 target, at least 1 reach
  if (balance.safety < 1 || balance.target < 1 || balance.reach < 1) {
    return false;
  }

  // Rule: Not more than 50% of one type
  const maxPercentage = balance.total * 0.5;
  if (balance.reach > maxPercentage || balance.safety > maxPercentage || balance.target > maxPercentage) {
    return false;
  }

  return true;
}

/**
 * Generate balance warning message
 */
export function getCollegeBalanceMessage(colleges: College[]): string {
  if (colleges.length === 0) {
    return 'No colleges added yet. Start building your list!';
  }

  const balance = calculateCollegeBalance(colleges);
  const isBalanced = isCollegeListBalanced(colleges);

  if (balance.reach === 0 && balance.target === 0) {
    return `⚠️ All ${balance.total} schools are Safety schools. Add some Target and Reach schools.`;
  }

  if (balance.reach === 0) {
    return `⚠️ No Reach schools. Consider adding 1-2 ambitious targets.`;
  }

  if (balance.safety === 0) {
    return `⚠️ No Safety schools. Add 1-2 schools where your stats are well above average.`;
  }

  if (balance.target === 0) {
    return `⚠️ No Target schools. Add 2-3 schools where your stats match the typical admitted student.`;
  }

  if (balance.reach > balance.total * 0.6) {
    return `⚠️ College list is ${Math.round((balance.reach / balance.total) * 100)}% Reach schools. Consider adding more Target schools.`;
  }

  if (isBalanced) {
    return `✅ Good balance: ${balance.reach} Reach, ${balance.target} Target, ${balance.safety} Safety school${balance.safety > 1 ? 's' : ''}.`;
  }

  return `College list has ${balance.total} schools. Consider reviewing balance.`;
}
