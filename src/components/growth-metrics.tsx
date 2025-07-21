import { cn } from '@/lib/utils';
import { formatValue, formatChange } from '@/utils/format-utils';

type GrowthMetricItem = {
  change: number;
  name: string;
  period: string;
  trend: 'up' | 'down' | 'neutral';
  unit: string;
  value: number;
};

type GrowthMetricsProps = {
  data: GrowthMetricItem[];
};

export function GrowthMetrics({ data }: GrowthMetricsProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No growth metrics data available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        {data.map((metric, index) => (
          <div
            key={`${metric.name}-${index}`}
            className={cn(
              'p-4 rounded-lg border',
              metric.trend === 'up' &&
                'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
              metric.trend === 'down' &&
                'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800',
              metric.trend === 'neutral' &&
                'bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800'
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">{metric.name}</h3>
                  <span className="text-xs bg-background px-2 py-1 rounded-full border">
                    {metric.period}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Current Value
                    </p>
                    <p className="text-2xl font-bold">
                      {formatValue(metric.value, metric.unit)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Change</p>
                    <p
                      className={cn(
                        'text-xl font-bold',
                        metric.trend === 'up' &&
                          'text-green-700 dark:text-green-300',
                        metric.trend === 'down' &&
                          'text-red-700 dark:text-red-300',
                        metric.trend === 'neutral' &&
                          'text-gray-700 dark:text-gray-300'
                      )}
                    >
                      {formatChange(metric.change, metric.unit)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
