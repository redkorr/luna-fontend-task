import { buildModuleChartSearchParams } from '@/lib/buildModuleChartSearchParams';
import { describe, expect, it } from 'vitest';

describe('buildModuleChartSearchParams', () => {
  it('Should build URLParams with start, stop and mode', () => {
    const params = {
      start: '2024-07-01',
      stop: '2024-07-10',
      mode: 'daily',
    };

    const result = buildModuleChartSearchParams(params);

    expect(result).toBe('start=2024-07-01&stop=2024-07-10&mode=daily');
  });

  it('Should build URLParams with start, stop and mode set to hourly', () => {
    const params = {
      start: '2024-07-01',
      stop: '2024-07-10',
      mode: 'hourly',
    };

    const result = buildModuleChartSearchParams(params);

    expect(result).toBe('start=2024-07-01&stop=2024-07-10&mode=hourly');
  });
});
