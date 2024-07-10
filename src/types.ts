export type Module = {
  id: string;
  name: string;
  available: boolean;
  targetTemperature: number;
  description?: string;
};

export type Temperature = {
  timestamp: string;
  temperature: number;
};

export type SearchParams = {
  start: string | undefined;
  stop: string | undefined;
  mode: string;
};

export type HistoryMode = 'hourly' | 'daily';
