import { capitalizeFirstLetter } from '@/lib/capitalizeFirstLetter';
import { describe, expect, it } from 'vitest';

describe('capitalizeFirstLetter', () => {
  it('Should capitalize the first letter of given word', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello');
  });

  it('Should handle empty string', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });

  it('Should handle string that are already capitalized', () => {
    expect(capitalizeFirstLetter('Hello')).toBe('Hello');
  });

  it('Should handle single character strings', () => {
    expect(capitalizeFirstLetter('h')).toBe('H');
    expect(capitalizeFirstLetter('H')).toBe('H');
  });

  it('Should handle non alphabetic characters', () => {
    expect(capitalizeFirstLetter('!hello')).toBe('!hello');
  });
});
