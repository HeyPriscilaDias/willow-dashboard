import { Student, Flag } from '@/lib/types';
import { STUDENT_COLLEGES } from '@/lib/data/studentColleges';

export const FLAG_TYPES: Record<string, Flag> = {
  revision: {
    icon: '✏️',
    name: 'Needs Revision',
    description: 'Artifact requires revision',
    reason: 'Quality/Content issue detected'
  },
  deadline: {
    icon: '⏰',
    name: 'Missed Deadline',
    description: 'Assignment deadline has passed',
    reason: 'Overdue submission required'
  },
  strategy: {
    icon: '🎯',
    name: 'Strategy Risk',
    description: 'Post-secondary strategy needs review',
    reason: 'Plan may not meet post-secondary goals'
  },
  sentiment: {
    icon: '🚨',
    name: 'Sentiment Alert',
    description: 'Concerning sentiment detected',
    reason: 'Safety concern requiring immediate attention'
  },
  academic: {
    icon: '📚',
    name: 'Academic Warning',
    description: 'Academic performance concern',
    reason: 'GPA or academic data needs attention'
  },
  staff: {
    icon: '👤',
    name: 'Staff Follow-up',
    description: 'Requires staff attention',
    reason: 'Manual note added by staff'
  }
};

export const STUDENTS: Student[] = [
  {
    id: 1,
    name: 'Jordan Martinez',
    grade: 11,
    status: 'off-track',
    flags: ['sentiment', 'deadline'],
    lastActivity: '2024-11-28',
    gpa: 1.6,
    dataDate: 'Feb 1, 2024',
    statusReason: 'Status is Off Track because of: Missed Deadline Check (Unit 2 is Past Due)',
    assignmentStatus: 'Missing',
    teacherConcern: true,
    class: 'Period 1'
  },
  {
    id: 2,
    name: 'Alex Chen',
    grade: 10,
    status: 'on-track',
    flags: ['revision'],
    lastActivity: '2024-11-27',
    gpa: 3.5,
    dataDate: 'Nov 1, 2024',
    statusReason: 'Status is On Track because: All required deadlines completed on time',
    assignmentStatus: 'Submitted',
    teacherConcern: false,
    class: 'Period 2'
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    grade: 12,
    status: 'off-track',
    flags: ['academic', 'strategy'],
    lastActivity: '2024-11-25',
    gpa: 2.1,
    dataDate: 'Oct 15, 2024',
    statusReason: 'Status is Off Track because of: Low GPA and missing college prep activities',
    assignmentStatus: 'Missing',
    teacherConcern: true,
    class: 'Period 1',
    collegeList: STUDENT_COLLEGES[3] // Scenario 3: Ivy League Risk (all reach schools)
  },
  {
    id: 4,
    name: 'Marcus Thompson',
    grade: 9,
    status: 'on-track',
    flags: [],
    lastActivity: '2024-11-28',
    gpa: 3.8,
    dataDate: 'Nov 20, 2024',
    statusReason: 'Status is On Track because: Excellent academic progress',
    assignmentStatus: 'Submitted',
    teacherConcern: false,
    class: 'Period 3'
  },
  {
    id: 5,
    name: 'Emma Rodriguez',
    grade: 11,
    status: 'off-track',
    flags: ['sentiment'],
    lastActivity: '2024-11-26',
    gpa: 2.8,
    dataDate: 'Nov 10, 2024',
    statusReason: 'Status is Off Track because of: Sentiment Alert triggered in recent interactions',
    assignmentStatus: 'Missing',
    teacherConcern: true,
    class: 'Period 2'
  },
  {
    id: 6,
    name: 'David Park',
    grade: 10,
    status: 'on-track',
    flags: [],
    lastActivity: '2024-11-28',
    gpa: 3.6,
    dataDate: 'Nov 18, 2024',
    statusReason: 'Status is On Track because: Strong academic performance and engagement',
    assignmentStatus: 'Submitted',
    teacherConcern: false,
    class: 'Period 3'
  },
  {
    id: 7,
    name: 'Jessica Williams',
    grade: 12,
    status: 'on-track',
    flags: ['revision'],
    lastActivity: '2024-11-27',
    gpa: 3.3,
    dataDate: 'Nov 15, 2024',
    statusReason: 'Status is On Track because: On track for graduation with career plan',
    assignmentStatus: 'Submitted',
    teacherConcern: false,
    class: 'Period 1',
    collegeList: STUDENT_COLLEGES[7] // Good balance example
  },
  {
    id: 8,
    name: 'Kevin Lopez',
    grade: 11,
    status: 'off-track',
    flags: ['deadline', 'academic'],
    lastActivity: '2024-11-24',
    gpa: 1.9,
    dataDate: 'Oct 20, 2024',
    statusReason: 'Status is Off Track because of: Multiple missed deadlines and declining GPA',
    assignmentStatus: 'Missing',
    teacherConcern: true,
    class: 'Period 2'
  },
  {
    id: 9,
    name: 'Olivia Grant',
    grade: 9,
    status: 'on-track',
    flags: [],
    lastActivity: '2024-11-28',
    gpa: 3.9,
    dataDate: 'Nov 22, 2024',
    statusReason: 'Status is On Track because: Excellent academic performance and full curriculum engagement',
    assignmentStatus: 'Submitted',
    teacherConcern: false,
    class: 'Period 3'
  },
  {
    id: 10,
    name: 'Tyler Bennett',
    grade: 10,
    status: 'off-track',
    flags: ['deadline'],
    lastActivity: '2024-11-10',
    gpa: 3.8,
    dataDate: 'Nov 25, 2024',
    statusReason: 'Status is Off Track because of: Curriculum Stagnation (0% vs 31% expected)',
    assignmentStatus: 'Missing',
    teacherConcern: false,
    class: 'Period 1'
  },
  {
    id: 11,
    name: 'Riley Chen',
    grade: 11,
    status: 'on-track',
    flags: [],
    lastActivity: '2024-11-28',
    gpa: 3.2,
    dataDate: 'Nov 24, 2024',
    statusReason: 'Status is On Track because: Meeting curriculum deadlines and academic expectations',
    assignmentStatus: 'Submitted',
    teacherConcern: false,
    class: 'Period 2'
  },
  {
    id: 12,
    name: 'Morgan Walsh',
    grade: 12,
    status: 'on-track',
    flags: [],
    lastActivity: '2024-11-27',
    gpa: 3.7,
    dataDate: 'Nov 23, 2024',
    statusReason: 'Status is On Track because: Strong curriculum completion and career planning progress',
    assignmentStatus: 'Submitted',
    teacherConcern: false,
    class: 'Period 3',
    collegeList: STUDENT_COLLEGES[12] // Another balanced example
  },
  {
    id: 13,
    name: 'Casey Miller',
    grade: 9,
    status: 'off-track',
    flags: ['revision', 'deadline'],
    lastActivity: '2024-11-20',
    gpa: 2.4,
    dataDate: 'Nov 21, 2024',
    statusReason: 'Status is Off Track because of: Low curriculum completion (12% vs 31% expected) and quality issues',
    assignmentStatus: 'Missing',
    teacherConcern: true,
    class: 'Period 1'
  },
  {
    id: 14,
    name: 'Jordan Kim',
    grade: 10,
    status: 'on-track',
    flags: [],
    lastActivity: '2024-11-28',
    gpa: 3.4,
    dataDate: 'Nov 19, 2024',
    statusReason: 'Status is On Track because: Consistent engagement with curriculum and solid academic performance',
    assignmentStatus: 'Submitted',
    teacherConcern: false,
    class: 'Period 2'
  }
];
