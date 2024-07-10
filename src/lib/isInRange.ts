export function isInRange(a: number, b: number, variance: number): boolean {
  return Math.abs(a - b) <= variance;
}
