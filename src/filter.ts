export function shouldIgnore(subject: string): boolean {
  const raw = process.env.IGNORE_SUBJECT_LITERAL;
  if (!raw) return false;

  const trimmed = raw.trim();
  if (trimmed.length > 100) {
    console.warn(`IGNORE_SUBJECT_LITERAL too long, ignoring filter`);
    return false;
  }

  // Case-insensitive substring match
  return subject.toLowerCase().includes(trimmed.toLowerCase());
}
