import { Application } from '@/lib/types';

// Sample application data for 12th graders
export const STUDENT_APPLICATIONS: Record<number, Application[]> = {
  // Sarah Johnson (ID 3) - Early applications, waiting for decisions
  3: [
    {
      id: 'A3-1',
      schoolName: 'Stanford University',
      submittedDate: '2024-01-15',
      status: 'pending',
      decisionType: 'regular',
    },
    {
      id: 'A3-2',
      schoolName: 'MIT',
      submittedDate: '2024-01-16',
      status: 'pending',
      decisionType: 'regular',
    },
    {
      id: 'A3-3',
      schoolName: 'Harvard University',
      submittedDate: '2024-01-17',
      status: 'pending',
      decisionType: 'regular',
    },
    {
      id: 'A3-4',
      schoolName: 'Yale University',
      submittedDate: '2024-01-18',
      status: 'pending',
      decisionType: 'regular',
    },
    {
      id: 'A3-5',
      schoolName: 'Princeton University',
      submittedDate: '2024-01-19',
      status: 'pending',
      decisionType: 'regular',
    },
    {
      id: 'A3-6',
      schoolName: 'University of Pennsylvania',
      submittedDate: '2024-01-20',
      status: 'pending',
      decisionType: 'regular',
    },
    {
      id: 'A3-7',
      schoolName: 'Columbia University',
      submittedDate: '2024-01-21',
      status: 'pending',
      decisionType: 'regular',
    },
    {
      id: 'A3-8',
      schoolName: 'Northwestern University',
      submittedDate: '2024-01-22',
      status: 'pending',
      decisionType: 'regular',
    },
  ],

  // Jessica Williams (ID 7) - Mix of submitted, decisions, and one acceptance
  7: [
    {
      id: 'A7-1',
      schoolName: 'Pomona College',
      submittedDate: '2024-01-10',
      status: 'accepted',
      decisionDate: '2024-03-30',
      decisionType: 'regular',
    },
    {
      id: 'A7-2',
      schoolName: 'University of Michigan',
      submittedDate: '2024-01-12',
      status: 'pending',
      decisionType: 'regular',
    },
    {
      id: 'A7-3',
      schoolName: 'University of Wisconsin-Madison',
      submittedDate: '2024-01-14',
      status: 'pending',
      decisionType: 'regular',
    },
    {
      id: 'A7-4',
      schoolName: 'Indiana University',
      submittedDate: '2024-01-08',
      status: 'accepted',
      decisionDate: '2024-03-15',
      decisionType: 'regular',
    },
    {
      id: 'A7-5',
      schoolName: 'Purdue University',
      submittedDate: '2024-01-09',
      status: 'accepted',
      decisionDate: '2024-03-20',
      decisionType: 'regular',
    },
  ],

  // Morgan Walsh (ID 12) - UC/Cal Poly applications
  12: [
    {
      id: 'A12-1',
      schoolName: 'UC Berkeley',
      submittedDate: '2024-11-15',
      status: 'submitted',
      decisionType: 'regular',
    },
    {
      id: 'A12-2',
      schoolName: 'UCLA',
      submittedDate: '2024-11-16',
      status: 'submitted',
      decisionType: 'regular',
    },
    {
      id: 'A12-3',
      schoolName: 'UC San Diego',
      submittedDate: '2024-11-17',
      status: 'submitted',
      decisionType: 'regular',
    },
    {
      id: 'A12-4',
      schoolName: 'UC Santa Barbara',
      submittedDate: '2024-11-18',
      status: 'submitted',
      decisionType: 'regular',
    },
    {
      id: 'A12-5',
      schoolName: 'Cal Poly San Luis Obispo',
      submittedDate: '2024-11-19',
      status: 'submitted',
      decisionType: 'regular',
    },
    {
      id: 'A12-6',
      schoolName: 'UC Davis',
      submittedDate: '2024-11-14',
      status: 'submitted',
      decisionType: 'regular',
    },
  ],
};

/**
 * Get applications for a specific student
 */
export function getStudentApplications(studentId: number): Application[] {
  return STUDENT_APPLICATIONS[studentId] || [];
}

/**
 * Calculate application status summary
 */
export function calculateApplicationStatus(applications: Application[]) {
  const submitted = applications.filter(a => a.status === 'submitted').length;
  const pending = applications.filter(a => a.status === 'pending').length;
  const accepted = applications.filter(a => a.status === 'accepted').length;
  const rejected = applications.filter(a => a.status === 'rejected').length;
  const waitlisted = applications.filter(a => a.status === 'waitlisted').length;
  const decisions = accepted + rejected + waitlisted;

  return { submitted, pending, accepted, rejected, waitlisted, decisions, total: applications.length };
}
