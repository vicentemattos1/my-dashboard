import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getTrendIcon } from '@/utils/trend-utils';
import { formatValue, formatChange } from '@/utils/format-utils';

type FinancialKPIItem = {
  change: number;
  name: string;
  period: string;
  trend: 'up' | 'down' | 'neutral';
  unit: string;
  value: number;
};

type FinancialKPIsProps = {
  data: FinancialKPIItem[];
};

export function FinancialKPIs({ data }: FinancialKPIsProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No financial KPI data available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {data.map((kpi, index) => (
        <Card key={`${kpi.name}-${index}`} className="relative py-3">
          <CardHeader className="pb-2 pt-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-medium text-muted-foreground leading-tight">
                {kpi.name}
              </CardTitle>
              <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                {kpi.period}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0 pb-3">
            <div className="space-y-1.5">
              <div className="text-lg font-bold leading-tight">
                {formatValue(kpi.value, kpi.unit)}
              </div>
              {kpi.change && (
                <div className="flex items-center gap-1.5">
                  {getTrendIcon(kpi.trend, 'sm')}
                  <span
                    className={cn(
                      'text-xs font-medium',
                      kpi.trend === 'up' &&
                        'text-green-600 dark:text-green-400',
                      kpi.trend === 'down' && 'text-red-600 dark:text-red-400',
                      kpi.trend === 'neutral' &&
                        'text-gray-600 dark:text-gray-400'
                    )}
                  >
                    {formatChange(kpi.change, kpi.unit)}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
