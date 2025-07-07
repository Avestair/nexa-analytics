export function trimString({
  string,
  maxLength,
  addDots = true,
}: {
  string: string;
  maxLength: number;
  addDots?: boolean;
}): string {
  const trimmed = string.trim();

  if (trimmed.length <= maxLength) return trimmed;

  return addDots
    ? `${trimmed.substring(0, maxLength)}...`
    : trimmed.substring(0, maxLength);
}
