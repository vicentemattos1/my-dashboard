import { cn } from '@/lib/utils';
import { formatValue, formatChange } from '@/utils/format-utils';

type GrowthMetricsItem = {
  change: number;
  name: string;
  period: string;
  trend: 'up' | 'down' | 'neutral';
  unit: string;
  value: number;
};

interface GrowthMetricsProps {
  data: GrowthMetricsItem[];
}

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
              'p-4 rounded-lg border transition-colors',
              metric.trend === 'up' &&
                'bg-brand-cool/10 dark:bg-brand-cool/20 border-brand-cool/30 dark:border-brand-cool/40',
              metric.trend === 'down' &&
                'bg-destructive/10 dark:bg-destructive/20 border-destructive/30 dark:border-destructive/40',
              metric.trend === 'neutral' &&
                'bg-brand-warm/10 dark:bg-brand-warm/20 border-brand-warm/30 dark:border-brand-warm/40'
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
                          'text-brand-cool dark:text-brand-cool',
                        metric.trend === 'down' &&
                          'text-destructive dark:text-destructive',
                        metric.trend === 'neutral' &&
                          'text-brand-warm dark:text-brand-warm'
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
