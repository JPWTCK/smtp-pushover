export function shouldIgnore(subject: string): boolean {
  const raw = process.env.IGNORE_SUBJECT_LITERAL;
  if (!raw) return false;

  // Split by comma, trim spaces, drop empties
  const parts = raw
    .split(",")
    .map(p => p.trim())
    .filter(p => p.length > 0 && p.length <= 100);

  if (parts.length === 0) return false;

  const lower = subject.toLowerCase();
  return parts.some(p => lower.includes(p.toLowerCase()));
}
