export interface LessonProgress {
  date: string;
  lessonsUnlocked: number;
  totalLessons: number;
  percentage: number;
}

export interface GradeLevelFidelity {
  grade: number;
  lessonsUnlocked: number;
  totalLessons: number;
  percentage: number;
}

// Historical progress data showing progress over time
export const FIDELITY_PROGRESS: LessonProgress[] = [
  { date: 'Sep 1', lessonsUnlocked: 45, totalLessons: 234, percentage: 19 },
  { date: 'Sep 15', lessonsUnlocked: 62, totalLessons: 234, percentage: 26 },
  { date: 'Oct 1', lessonsUnlocked: 89, totalLessons: 234, percentage: 38 },
  { date: 'Oct 15', lessonsUnlocked: 112, totalLessons: 234, percentage: 48 },
  { date: 'Nov 1', lessonsUnlocked: 145, totalLessons: 234, percentage: 62 },
  { date: 'Nov 15', lessonsUnlocked: 162, totalLessons: 234, percentage: 69 },
  { date: 'Nov 28', lessonsUnlocked: 175, totalLessons: 234, percentage: 75 },
];

// Current fidelity by grade level
export const GRADE_FIDELITY: GradeLevelFidelity[] = [
  { grade: 9, lessonsUnlocked: 48, totalLessons: 54, percentage: 89 },
  { grade: 10, lessonsUnlocked: 52, totalLessons: 58, percentage: 90 },
  { grade: 11, lessonsUnlocked: 42, totalLessons: 62, percentage: 68 },
  { grade: 12, lessonsUnlocked: 33, totalLessons: 60, percentage: 55 },
];

export const TOTAL_LESSONS_UNLOCKED = 175;
export const TOTAL_LESSONS = 234;
export const OVERALL_PERCENTAGE = 75;
