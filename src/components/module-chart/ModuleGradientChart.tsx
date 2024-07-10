import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { formatDateString } from '@/lib/formatDateString';
import { HistoryMode } from '@/types';
import { capitalizeFirstLetter } from '@/lib/capitalizeFirstLetter';

interface ModuleGradientChartProps<T> {
  areaKey: string;
  xAxisKey: string;
  historyMode: HistoryMode;
  data: Array<T>;
  color: string;
}

const ModuleGradientChart = <T,>({
  color,
  historyMode,
  data,
  xAxisKey,
  areaKey,
}: ModuleGradientChartProps<T>) => {
  const keyConfig = {
    xDataKey: xAxisKey,
    gradientId: `fill${capitalizeFirstLetter(areaKey)}`,
  };

  const chartConfig = {
    temperature: {
      label: capitalizeFirstLetter(areaKey),
      color: color,
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          axisLine={false}
          tickMargin={1}
          tickFormatter={(value) => formatDateString(value, historyMode)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id={keyConfig.gradientId} x1='0' y1='0' x2='0' y2='1'>
            <stop
              offset='5%'
              stopColor={`var(--color-${areaKey})`}
              stopOpacity={0.8}
            />
            <stop
              offset='95%'
              stopColor={`var(--color-${areaKey})`}
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey={areaKey}
          type='natural'
          fill={`url(#${keyConfig.gradientId})`}
          fillOpacity={0.4}
          stroke={`var(--color-${areaKey})`}
          stackId='a'
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default ModuleGradientChart;
