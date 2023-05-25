export default function getFirstQueryStringValue(
  value: string | string[] | undefined
): string | null {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value || null;
}
