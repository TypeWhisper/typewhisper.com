/** Compare a published add-on requirement with a known stable app version. */
export function requiresNewerHost(
  minimum: string | undefined,
  stable: string | null | undefined,
): boolean {
  const parse = (value: string | null | undefined) => {
    const match = value?.match(/^v?(\d+)\.(\d+)(?:\.(\d+))?$/);
    return match ? [Number(match[1]), Number(match[2]), Number(match[3] ?? 0)] : undefined;
  };
  const required = parse(minimum);
  const available = parse(stable);
  if (!required || !available) return false;

  for (let index = 0; index < required.length; index++) {
    if (required[index] !== available[index]) {
      return required[index] > available[index];
    }
  }
  return false;
}
