export function getDatePortion(date: Date): string {
  const offset = date.getTimezoneOffset();
  const timezoneAdjustedDate = new Date(date.getTime() - offset * 60 * 1000);
  return timezoneAdjustedDate.toISOString().split("T")[0];
}
