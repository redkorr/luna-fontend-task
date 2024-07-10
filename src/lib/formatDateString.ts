import { HistoryMode } from '@/types';

export function formatDateString(
  dateString: string,
  mode: HistoryMode = 'daily'
): string {
  const date = new Date(dateString);

  if (mode === 'hourly') {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  } else if (mode === 'daily') {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  } else {
    return dateString;
  }
}
