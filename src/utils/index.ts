/**
 * Conditionally joins CSS class names together.
 * Useful when working with complex Tailwind configurations.
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Formats a ISO date string to a human-readable format.
 */
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

/**
 * Truncates a string to a specified length and adds an ellipsis.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
