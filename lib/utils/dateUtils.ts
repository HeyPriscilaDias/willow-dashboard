/**
 * Calculate days between two dates
 */
export function daysBetween(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  return Math.round((date2.getTime() - date1.getTime()) / oneDay);
}

/**
 * Parse a date string in format like "Feb 1, 2024" or "Nov 1, 2024"
 */
export function parseGPADate(dateStr: string): Date | null {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return null;
    }
    return date;
  } catch {
    return null;
  }
}

/**
 * Calculate days since a date string (like GPA entry date)
 * Returns null if date parsing fails
 * Note: Must pass currentDate explicitly to avoid hydration mismatch
 */
export function daysSinceDateString(dateStr: string, currentDate?: Date): number | null {
  const date = parseGPADate(dateStr);
  if (!date) return null;
  const now = currentDate || new Date();
  return daysBetween(date, now);
}

/**
 * Check if GPA data is stale (> 365 days old)
 * Note: Must pass currentDate explicitly to avoid hydration mismatch
 */
export function isStaleGPA(dateStr: string, currentDate?: Date): boolean {
  const days = daysSinceDateString(dateStr, currentDate);
  if (days === null) return false;
  return days > 365;
}

/**
 * Format days as text (e.g., "9 months old", "15 days old")
 */
export function formatDaysAsAge(days: number): string {
  if (days < 30) {
    return `${days} days old`;
  }
  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} month${months > 1 ? 's' : ''} old`;
  }
  const years = Math.floor(days / 365);
  return `${years} year${years > 1 ? 's' : ''} old`;
}
