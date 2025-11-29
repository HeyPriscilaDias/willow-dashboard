import {
  Student,
  StudentLessonCompletion,
  StudentPacingStatus,
  GradePacingAggregate,
  PacingFilterState,
  PacingMetrics,
  CurriculumStatus,
} from '@/lib/types';
import { getCurriculumLessonsByGrade } from '@/lib/data/curriculum';

// School year constants
const SCHOOL_YEAR_START = new Date('2024-09-01');
const SCHOOL_YEAR_END = new Date('2025-06-15');
const TOTAL_SCHOOL_DAYS = 288;
const LESSONS_PER_GRADE = 30;

/**
 * Calculate days elapsed since start of school year
 */
export function calculateDaysElapsed(): number {
  const today = new Date('2024-11-28'); // Fixed date for consistency
  const diffTime = today.getTime() - SCHOOL_YEAR_START.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Calculate what percentage of lessons should be completed by now
 * Based on proportion of school year that has elapsed
 */
export function calculateExpectedCompletionPercentage(): number {
  const daysElapsed = calculateDaysElapsed();
  const expectedPercent = (daysElapsed / TOTAL_SCHOOL_DAYS) * 100;
  return Math.round(expectedPercent);
}

/**
 * Calculate pacing status for an individual student
 */
export function calculateStudentPacingStatus(
  student: Student,
  completions: StudentLessonCompletion[]
): StudentPacingStatus {
  // Get all lessons for this student's grade
  const gradeLesson = getCurriculumLessonsByGrade(student.grade);
  const totalLessons = gradeLesson.length || LESSONS_PER_GRADE;

  // Count completed lessons for this student
  const studentCompletions = completions.filter(c => c.studentId === student.id && c.status === 'completed');
  const lessonsCompleted = studentCompletions.length;

  // Calculate actual completion percentage
  const actualPercent = Math.round((lessonsCompleted / totalLessons) * 100);

  // Calculate expected completion percentage
  const expectedPercent = calculateExpectedCompletionPercentage();

  // Calculate variance (negative means behind)
  const variance = actualPercent - expectedPercent;

  // Determine pacing status
  const pacingStatus = actualPercent >= expectedPercent ? 'on-track' : 'behind';

  // Get last lesson completion date
  let lastLessonDateStr = 'N/A';
  if (studentCompletions.length > 0) {
    const dates = studentCompletions.map(c => c.completedDate).sort();
    lastLessonDateStr = dates[dates.length - 1];
  }

  return {
    studentId: student.id,
    studentName: student.name,
    grade: student.grade,
    lessonsCompleted,
    totalLessonsForGrade: totalLessons,
    completionPercentage: actualPercent,
    expectedCompletionPercentage: expectedPercent,
    actualCompletionPercentage: actualPercent,
    variancePercentage: variance,
    pacingStatus,
    lastLessonDate: lastLessonDateStr,
  };
}

/**
 * Calculate curriculum completion status for a student
 * Detects "Ghost" high achievers (high GPA, zero curriculum engagement)
 */
export function calculateStudentCurriculumStatus(
  student: Student,
  completions: StudentLessonCompletion[]
): CurriculumStatus {
  // Get all lessons for this student's grade
  const gradeLessons = getCurriculumLessonsByGrade(student.grade);
  const totalLessons = gradeLessons.length || LESSONS_PER_GRADE;

  // Count completed lessons for this student
  const studentCompletions = completions.filter(c => c.studentId === student.id && c.status === 'completed');
  const lessonsCompleted = studentCompletions.length;

  // Calculate actual completion percentage
  const completionPercentage = Math.round((lessonsCompleted / totalLessons) * 100);

  // Calculate expected completion percentage
  const expectedCompletionPercentage = calculateExpectedCompletionPercentage();

  // Calculate variance (negative means behind)
  const variancePercentage = completionPercentage - expectedCompletionPercentage;

  // Detect Ghost scenario: high GPA but zero curriculum engagement
  const isGhost = student.gpa >= 3.5 && completionPercentage < 10;

  // Create a reason string for Ghost detection
  let ghostReason = '';
  if (isGhost) {
    ghostReason = `GPA ${student.gpa} | ${completionPercentage}% Curriculum`;
  }

  return {
    completionPercentage,
    expectedCompletionPercentage,
    variancePercentage,
    lessonsCompleted,
    totalLessonsForGrade: totalLessons,
    isGhost,
    ghostReason,
  };
}

/**
 * Calculate aggregate pacing metrics for a specific grade
 */
export function calculateGradePacingAggregate(
  grade: number,
  students: Student[],
  completions: StudentLessonCompletion[]
): GradePacingAggregate {
  const gradeStudents = students.filter(s => s.grade === grade);
  const studentStatuses = gradeStudents.map(student =>
    calculateStudentPacingStatus(student, completions)
  );

  const onPaceCount = studentStatuses.filter(s => s.pacingStatus === 'on-track').length;
  const behindCount = studentStatuses.filter(s => s.pacingStatus === 'behind').length;

  // Calculate average variance
  const totalVariance = studentStatuses.reduce((sum, s) => sum + s.variancePercentage, 0);
  const averageVariance = studentStatuses.length > 0 ? Math.round(totalVariance / studentStatuses.length) : 0;

  return {
    grade,
    totalStudents: gradeStudents.length,
    onPaceCount,
    behindCount,
    onPacePercentage: gradeStudents.length > 0 ? Math.round((onPaceCount / gradeStudents.length) * 100) : 0,
    averageVariancePercentage: averageVariance,
    studentDetails: studentStatuses.sort((a, b) => a.variancePercentage - b.variancePercentage),
  };
}

/**
 * Calculate overall school pacing metrics
 */
export function calculateOverallPacingMetrics(
  students: Student[],
  completions: StudentLessonCompletion[]
): PacingMetrics {
  const allStatuses = students.map(student =>
    calculateStudentPacingStatus(student, completions)
  );

  const onPaceCount = allStatuses.filter(s => s.pacingStatus === 'on-track').length;
  const behindCount = allStatuses.filter(s => s.pacingStatus === 'behind').length;

  return {
    onPacePercentage: students.length > 0 ? Math.round((onPaceCount / students.length) * 100) : 0,
    behindPercentage: students.length > 0 ? Math.round((behindCount / students.length) * 100) : 0,
    totalStudents: students.length,
  };
}

/**
 * Apply filters to grade aggregates
 */
export function applyPacingFilters(
  aggregates: GradePacingAggregate[],
  filters: PacingFilterState
): GradePacingAggregate[] {
  let filtered = aggregates;

  // Filter by selected grades
  if (filters.selectedGrades.length > 0) {
    filtered = filtered.filter(agg => filters.selectedGrades.includes(agg.grade));
  }

  // Filter by behind threshold
  if (filters.behindThreshold !== 'all') {
    const threshold = parseInt(filters.behindThreshold);
    filtered = filtered.map(agg => ({
      ...agg,
      studentDetails: agg.studentDetails.filter(
        s => s.pacingStatus === 'behind' && Math.abs(s.variancePercentage) >= threshold
      ),
    }));
  }

  // Apply sorting
  if (filters.sortBy === 'most-behind') {
    filtered = filtered.map(agg => ({
      ...agg,
      studentDetails: [...agg.studentDetails].sort(
        (a, b) => a.variancePercentage - b.variancePercentage
      ),
    }));
  } else if (filters.sortBy === 'grade') {
    filtered = filtered.sort((a, b) => a.grade - b.grade);
  } else if (filters.sortBy === 'name') {
    filtered = filtered.map(agg => ({
      ...agg,
      studentDetails: [...agg.studentDetails].sort(
        (a, b) => a.studentName.localeCompare(b.studentName)
      ),
    }));
  }

  return filtered;
}

/**
 * Get all grade aggregates for all grades 9-12
 */
export function getAllGradeAggregates(
  students: Student[],
  completions: StudentLessonCompletion[]
): GradePacingAggregate[] {
  return [9, 10, 11, 12].map(grade => calculateGradePacingAggregate(grade, students, completions));
}
