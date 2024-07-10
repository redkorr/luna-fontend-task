import { formatDateString } from '@/lib/formatDateString';
import { HistoryMode } from '@/types';
import { describe, expect, it } from 'vitest';

describe('formatDateString', () => {
  it('Should format date string in hourly mode', () => {
    const dateString = '2024-07-10T14:10:00Z';
    const formatted = formatDateString(dateString, 'hourly');
    expect(formatted).toBe('16:10');
  });

  it('Should format date string in daily mode', () => {
    const dateString = '2024-07-10T14:10:00Z';
    const formatted = formatDateString(dateString, 'daily');
    expect(formatted).toBe('Jul 10, 2024');
  });

  it('Should format date string in daily mode by default', () => {
    const dateString = '2024-06-11T14:10:00Z';
    const formatted = formatDateString(dateString);
    expect(formatted).toBe('Jun 11, 2024');
  });

  it('Should throw invalid date error in daily mode', () => {
    const dateString = '20-04-03';
    const formatted = formatDateString(dateString, 'daily');
    expect(formatted).toBe('Invalid Date');
  });

  it('Should return dateString for unsupported modes', () => {
    const dateString = '20-04-03';
    const formatted = formatDateString(dateString, 'monthly' as HistoryMode);
    expect(formatted).toBe(dateString);
  });
});
