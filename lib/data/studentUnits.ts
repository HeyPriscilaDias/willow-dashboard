import { Unit } from '@/lib/types';

// Sample unit data for students - organized by studentId
export const STUDENT_UNITS: Record<number, Unit[]> = {
  // Tyler Bennett (Grade 10) - Scenario 1: Ghost High Achiever
  // Unit 1 due Nov 15, now Nov 28 = 13 days overdue
  10: [
    {
      unitNumber: 1,
      title: 'Career Vision',
      dueDate: '2024-11-15',
      status: 'overdue',
      daysSinceOverdue: 13,
      artifacts: [
        {
          id: 'A10-U1-1',
          title: 'Career Vision Statement',
          status: 'needed',
          feedback: 'Not yet submitted',
        },
        {
          id: 'A10-U1-2',
          title: 'Career Exploration Matrix',
          status: 'needed',
          feedback: 'Not yet submitted',
        },
      ],
    },
    {
      unitNumber: 2,
      title: 'Impact Project',
      dueDate: '2024-12-15',
      status: 'not-started',
      artifacts: [
        {
          id: 'A10-U2-1',
          title: 'Impact Proposal',
          status: 'needed',
        },
      ],
    },
    {
      unitNumber: 3,
      title: 'Career Pathways',
      dueDate: '2025-01-15',
      status: 'not-started',
      artifacts: [
        {
          id: 'A10-U3-1',
          title: 'Career Pathways Slide Deck',
          status: 'needed',
        },
      ],
    },
  ],

  // Casey Miller (Grade 9) - Scenario 2: Gamer (Low Quality)
  // Unit 1 due Oct 15, submitted but quality issues
  13: [
    {
      unitNumber: 1,
      title: 'Portfolio Foundation',
      dueDate: '2024-10-15',
      status: 'completed',
      artifacts: [
        {
          id: 'A13-U1-1',
          title: 'Who I Am Statement',
          status: 'needs-revision',
          submittedDate: '2024-10-10',
          fileName: 'who-i-am-statement.txt',
          qualityScore: 25,
          feedback: 'Too short (1 sentence, need 2-3 paragraphs). Missing personal background context.',
          reason: 'Content too short and lacks detail',
        },
        {
          id: 'A13-U1-2',
          title: 'Values Statement',
          status: 'submitted',
          submittedDate: '2024-10-12',
        },
      ],
    },
    {
      unitNumber: 2,
      title: 'Career Exploration',
      dueDate: '2024-11-15',
      status: 'in-progress',
      artifacts: [
        {
          id: 'A13-U2-1',
          title: 'Career Cluster Research',
          status: 'in-review',
          submittedDate: '2024-11-10',
        },
      ],
    },
  ],

  // Alex Chen (Grade 10) - Scenario 4: Stale Data
  // GPA is Feb 1, 2024 - data shows in DetailPanel with age indicator
  2: [
    {
      unitNumber: 1,
      title: 'Career Vision',
      dueDate: '2024-11-01',
      status: 'completed',
      artifacts: [
        {
          id: 'A2-U1-1',
          title: 'Career Vision Statement',
          status: 'accepted',
          submittedDate: '2024-10-28',
          qualityScore: 90,
        },
      ],
    },
    {
      unitNumber: 2,
      title: 'Impact Project',
      dueDate: '2024-12-15',
      status: 'in-progress',
      artifacts: [
        {
          id: 'A2-U2-1',
          title: 'Impact Proposal',
          status: 'submitted',
          submittedDate: '2024-12-01',
          qualityScore: 85,
          feedback: 'Excellent work on food bank project analysis',
        },
      ],
    },
  ],

  // Jordan Martinez (Grade 11) - Scenario with multiple units
  1: [
    {
      unitNumber: 1,
      title: 'Resume Development',
      dueDate: '2024-11-08',
      status: 'overdue',
      daysSinceOverdue: 20,
      artifacts: [
        {
          id: 'A1-U1-1',
          title: 'Polished Resume',
          status: 'needed',
        },
      ],
    },
    {
      unitNumber: 2,
      title: 'Balanced List Building',
      dueDate: '2024-12-01',
      status: 'overdue',
      daysSinceOverdue: 27,
      artifacts: [
        {
          id: 'A1-U2-1',
          title: 'College List with Analysis',
          status: 'needed',
        },
      ],
    },
  ],

  // Marcus Thompson (Grade 9) - On track with no issues
  4: [
    {
      unitNumber: 1,
      title: 'Career Exploration Basics',
      dueDate: '2024-11-10',
      status: 'completed',
      artifacts: [
        {
          id: 'A4-U1-1',
          title: 'Career Exploration Summary',
          status: 'accepted',
          submittedDate: '2024-11-08',
          qualityScore: 88,
        },
      ],
    },
    {
      unitNumber: 2,
      title: 'Self-Assessment',
      dueDate: '2024-12-10',
      status: 'in-progress',
      artifacts: [
        {
          id: 'A4-U2-1',
          title: 'Strengths and Interests Assessment',
          status: 'submitted',
          submittedDate: '2024-12-05',
          qualityScore: 92,
        },
      ],
    },
  ],

  // Kevin Lopez (Grade 11) - Multiple deadlines, quality issues
  8: [
    {
      unitNumber: 1,
      title: 'Resume Development',
      dueDate: '2024-10-31',
      status: 'overdue',
      daysSinceOverdue: 28,
      artifacts: [
        {
          id: 'A8-U1-1',
          title: 'Polished Resume',
          status: 'needs-revision',
          submittedDate: '2024-11-10',
          fileName: 'kevin-resume.docx',
          qualityScore: 40,
          feedback: 'Format issues (should be PDF). Missing work experience details.',
          reason: 'File validation error and incomplete content',
        },
      ],
    },
    {
      unitNumber: 2,
      title: 'Balanced List Building',
      dueDate: '2024-11-30',
      status: 'overdue',
      daysSinceOverdue: -2,
      artifacts: [
        {
          id: 'A8-U2-1',
          title: 'College List with Analysis',
          status: 'needed',
        },
      ],
    },
  ],

  // Scenario 10: Paper Tiger (Grade 10) - Wrong file upload
  // Student uploaded History_Homework.pdf instead of Career Pathways Slide Deck
  15: [
    {
      unitNumber: 1,
      title: 'Self-Awareness Foundations',
      dueDate: '2024-11-20',
      status: 'completed',
      artifacts: [
        {
          id: 'A15-U1-1',
          title: 'Personal Values Statement',
          status: 'accepted',
          submittedDate: '2024-11-18',
          qualityScore: 92,
        },
      ],
    },
    {
      unitNumber: 2,
      title: 'Career Exploration',
      dueDate: '2024-12-10',
      status: 'in-progress',
      artifacts: [
        {
          id: 'A15-U2-1',
          title: 'Career Interest Assessment',
          status: 'accepted',
          submittedDate: '2024-12-01',
          qualityScore: 88,
        },
      ],
    },
    {
      unitNumber: 3,
      title: 'Career Pathways Analysis',
      dueDate: '2024-04-15',
      status: 'completed',
      artifacts: [
        {
          id: 'A15-U3-1',
          title: 'Career Pathways Slide Deck',
          status: 'needs-revision',
          submittedDate: '2024-04-10',
          fileName: 'History_Homework.pdf',
          qualityScore: 0,
          feedback: 'File mismatch: Expected a slide deck about career pathways analysis, but received a history assignment. Please upload the correct Career Pathways Slide Deck document.',
          reason: 'Wrong file uploaded (History_Homework.pdf instead of Career Pathways)',
        },
      ],
    },
  ],
};

/**
 * Get units for a specific student
 */
export function getStudentUnits(studentId: number): Unit[] {
  return STUDENT_UNITS[studentId] || [];
}
