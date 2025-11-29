import { StudentLessonCompletion } from '@/lib/types';

// Helper function to create valid dates between Sept 1 and Nov 28, 2024
function createDateStr(studentId: number, lessonIndex: number, totalLessons: number): string {
  // Spread lessons from Sept 1 (day 1) to Nov 28 (day 89)
  const dayOfYear = Math.floor(1 + (lessonIndex / totalLessons) * 87);

  // Calculate month and day
  let month = 9; // September
  let day = dayOfYear;

  if (dayOfYear > 30) {
    month = 10; // October
    day = dayOfYear - 30;
  }
  if (dayOfYear > 61) {
    month = 11; // November
    day = dayOfYear - 61;
  }

  // Ensure valid day (max 28 for November to be safe, max 30 for October, max 30 for September)
  const maxDays = month === 11 ? 28 : 30;
  const finalDay = Math.min(Math.max(1, day), maxDays);

  return `2024-${String(month).padStart(2, '0')}-${String(finalDay).padStart(2, '0')}`;
}

// Student lesson completions for the 8 sample students
// Each student has lessons for their respective grade level (lessons 1-30 per grade)

export const STUDENT_LESSON_COMPLETIONS: StudentLessonCompletion[] = [
  // Jordan Martinez (Grade 11, Off Track, should have ~24/30 lessons)
  ...Array.from({ length: 24 }, (_, i) => ({
    studentId: 1,
    lessonId: `G11-L${i + 1}`,
    completedDate: createDateStr(1, i, 24),
    status: 'completed' as const,
  })),

  // Alex Chen (Grade 10, Ready, should have ~28/30 lessons)
  ...Array.from({ length: 28 }, (_, i) => ({
    studentId: 2,
    lessonId: `G10-L${i + 1}`,
    completedDate: createDateStr(2, i, 28),
    status: 'completed' as const,
  })),

  // Sarah Johnson (Grade 12, Off Track, should have ~20/30 lessons)
  ...Array.from({ length: 20 }, (_, i) => ({
    studentId: 3,
    lessonId: `G12-L${i + 1}`,
    completedDate: createDateStr(3, i, 20),
    status: 'completed' as const,
  })),

  // Marcus Thompson (Grade 9, Ready, should have ~28/30 lessons)
  ...Array.from({ length: 28 }, (_, i) => ({
    studentId: 4,
    lessonId: `G9-L${i + 1}`,
    completedDate: createDateStr(4, i, 28),
    status: 'completed' as const,
  })),

  // Emma Rodriguez (Grade 11, Off Track, should have ~22/30 lessons)
  ...Array.from({ length: 22 }, (_, i) => ({
    studentId: 5,
    lessonId: `G11-L${i + 1}`,
    completedDate: createDateStr(5, i, 22),
    status: 'completed' as const,
  })),

  // David Park (Grade 10, Ready, should have ~29/30 lessons)
  ...Array.from({ length: 29 }, (_, i) => ({
    studentId: 6,
    lessonId: `G10-L${i + 1}`,
    completedDate: createDateStr(6, i, 29),
    status: 'completed' as const,
  })),

  // Jessica Williams (Grade 12, Ready, should have ~27/30 lessons)
  ...Array.from({ length: 27 }, (_, i) => ({
    studentId: 7,
    lessonId: `G12-L${i + 1}`,
    completedDate: createDateStr(7, i, 27),
    status: 'completed' as const,
  })),

  // Kevin Lopez (Grade 11, Off Track, should have ~19/30 lessons)
  ...Array.from({ length: 19 }, (_, i) => ({
    studentId: 8,
    lessonId: `G11-L${i + 1}`,
    completedDate: createDateStr(8, i, 19),
    status: 'completed' as const,
  })),

  // Olivia Grant (Grade 9, On Track, should have ~30/30 lessons - perfect)
  ...Array.from({ length: 30 }, (_, i) => ({
    studentId: 9,
    lessonId: `G9-L${i + 1}`,
    completedDate: createDateStr(9, i, 30),
    status: 'completed' as const,
  })),

  // Tyler Bennett (Grade 10, Off Track - GHOST HIGH ACHIEVER, should have ~0/30 lessons)
  // No lessons completed - Ghost scenario!

  // Riley Chen (Grade 11, On Track, should have ~25/30 lessons)
  ...Array.from({ length: 25 }, (_, i) => ({
    studentId: 11,
    lessonId: `G11-L${i + 1}`,
    completedDate: createDateStr(11, i, 25),
    status: 'completed' as const,
  })),

  // Morgan Walsh (Grade 12, On Track, should have ~29/30 lessons - nearly perfect)
  ...Array.from({ length: 29 }, (_, i) => ({
    studentId: 12,
    lessonId: `G12-L${i + 1}`,
    completedDate: createDateStr(12, i, 29),
    status: 'completed' as const,
  })),

  // Casey Miller (Grade 9, Off Track, should have ~4/30 lessons - very low)
  ...Array.from({ length: 4 }, (_, i) => ({
    studentId: 13,
    lessonId: `G9-L${i + 1}`,
    completedDate: createDateStr(13, i, 4),
    status: 'completed' as const,
  })),

  // Jordan Kim (Grade 10, On Track, should have ~26/30 lessons)
  ...Array.from({ length: 26 }, (_, i) => ({
    studentId: 14,
    lessonId: `G10-L${i + 1}`,
    completedDate: createDateStr(14, i, 26),
    status: 'completed' as const,
  })),
];
