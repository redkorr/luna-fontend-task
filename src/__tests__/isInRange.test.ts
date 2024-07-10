import { isInRange } from '@/lib/isInRange';
import { describe, expect, it } from 'vitest';

describe('isInRange', () => {
  it('Should return true when diffrence between a and b is less than or equal variance', () => {
    expect(isInRange(5, 8, 3)).toBe(true);
  });

  it('Should return false when diffrence between a and b is greater than or equal variance', () => {
    expect(isInRange(5, 9, 3)).toBe(false);
  });

  it('Should return true when a and b are the same and variance is 0', () => {
    expect(isInRange(5, 5, 0)).toBe(true);
  });

  it('Should return false when a and b are NOT the same and variance is 0', () => {
    expect(isInRange(5, 6, 0)).toBe(false);
  });
});
