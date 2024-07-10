import { SearchParams } from '@/types';

export const buildModuleChartSearchParams = (params: SearchParams): string => {
  const urlSearchParams = new URLSearchParams();
  if (params.start) {
    urlSearchParams.set('start', params.start);
  }
  if (params.stop) {
    urlSearchParams.set('stop', params.stop);
  }
  urlSearchParams.set('mode', params.mode);
  return urlSearchParams.toString();
};
