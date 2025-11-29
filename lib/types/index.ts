export type Role = 'counselor' | 'admin' | 'teacher';

export type FlagType = 'revision' | 'deadline' | 'strategy' | 'sentiment' | 'academic' | 'staff';

export type StudentStatus = 'on-track' | 'off-track';

export interface Flag {
  icon: string;
  name: string;
  description: string;
}

export interface Student {
  id: number;
  name: string;
  grade: number;
  status: StudentStatus;
  flags: FlagType[];
  lastActivity: string;
  gpa: number;
  dataDate: string;
  statusReason: string;
  assignmentStatus: 'Submitted' | 'Missing';
  teacherConcern: boolean;
  class: string;
}

export interface AnalyticsCard {
  label: string;
  value: string | number;
  detail: string;
  variant?: 'default' | 'off-track' | 'urgent' | 'fidelity' | 'pacing';
}

export interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
}

export interface CurriculumLesson {
  id: string;
  grade: number;
  unitNumber: number;
  lessonNumber: number;
  title: string;
  sequence: number;
}

export interface StudentLessonCompletion {
  studentId: number;
  lessonId: string;
  completedDate: string;
  status: 'completed' | 'in_progress' | 'not_started';
}

export interface StudentPacingStatus {
  studentId: number;
  studentName: string;
  grade: number;
  lessonsCompleted: number;
  totalLessonsForGrade: number;
  completionPercentage: number;
  expectedCompletionPercentage: number;
  actualCompletionPercentage: number;
  variancePercentage: number;
  pacingStatus: 'on-track' | 'behind';
  lastLessonDate: string;
}

export interface CurriculumStatus {
  completionPercentage: number;
  expectedCompletionPercentage: number;
  variancePercentage: number;
  lessonsCompleted: number;
  totalLessonsForGrade: number;
  isGhost: boolean;
  ghostReason: string;
}

export interface GradePacingAggregate {
  grade: number;
  totalStudents: number;
  onPaceCount: number;
  behindCount: number;
  onPacePercentage: number;
  averageVariancePercentage: number;
  studentDetails: StudentPacingStatus[];
}

export interface PacingFilterState {
  selectedGrades: number[];
  behindThreshold: 'all' | '5' | '10' | '20';
  sortBy: 'most-behind' | 'grade' | 'name';
}

export interface PacingMetrics {
  onPacePercentage: number;
  behindPercentage: number;
  totalStudents: number;
}
