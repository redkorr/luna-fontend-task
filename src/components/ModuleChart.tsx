import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useApi } from '@/hooks/useApi';
import { useParams } from 'react-router-dom';
import { HistoryMode, Temperature } from '@/types';

import { useEffect, useState } from 'react';
import { DatePickerWithRange } from './DateRangePicker';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import ModuleGradientChart from './module-chart/ModuleGradientChart';
import { buildModuleChartSearchParams } from '@/lib/buildModuleChartSearchParams';
import HistoryModeSelect from './module-chart/HistoryModeSelect';

export function ModuleChart() {
  const [historyMode, setHistoryMode] = useState<HistoryMode>('daily');
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const { id } = useParams();

  const { data, callApi } = useApi<Array<Temperature>>(
    `/modules/${id}/history?${buildModuleChartSearchParams({
      start: date?.from?.toISOString(),
      stop: date?.to?.toISOString(),
      mode: historyMode,
    })}`
  );

  useEffect(() => {
    callApi();
  }, [date, historyMode]);

  return (
    <>
      {data && (
        <Card>
          <CardHeader className='flex flex-col gap-3'>
            <CardTitle>Temperature {historyMode}</CardTitle>
            <CardDescription className='flex justify-around'>
              <HistoryModeSelect
                historyMode={historyMode}
                setHistoryMode={setHistoryMode}
              />
              <DatePickerWithRange date={date} setDate={setDate} />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ModuleGradientChart
              areaKey='temperature'
              color='teal'
              data={data}
              historyMode={historyMode}
              xAxisKey='timestamp'
            />
          </CardContent>
        </Card>
      )}
    </>
  );
}
