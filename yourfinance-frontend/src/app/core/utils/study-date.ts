// A Bible study note's date is a calendar day ("YYYY-MM-DD"), not a moment in time.
// Keeping it as a date-only string avoids timezone shifts: converting a picked day
// through a local Date and back to UTC can move it to the previous or next day.

/**
 * Formats a Date's local calendar day as "YYYY-MM-DD".
 * @param date The date to format; defaults to now.
 * @returns The local calendar day as a date-only string.
 */
export function toLocalDateOnly(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Normalizes a study date into "YYYY-MM-DD". Accepts the back-end's value
 * (a date-only string or UTC midnight such as "2026-10-02T00:00:00.000Z") and the
 * picker's value (local wall-clock such as "2026-10-02T09:15:00"). In both, the
 * leading "YYYY-MM-DD" is the calendar day, so it is read directly instead of
 * being parsed into a Date.
 * @param value The study date to normalize, if any.
 * @returns The calendar day, or today's local day when the value is missing or malformed.
 */
export function toStudyDate(value: string | null | undefined): string {
  const match = /^\d{4}-\d{2}-\d{2}/.exec(value ?? '');
  return match ? match[0] : toLocalDateOnly();
}
