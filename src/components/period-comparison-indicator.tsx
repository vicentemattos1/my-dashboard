import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PeriodComparisonIndicatorProps {
  value: number;
  prefix: string;
  className?: string;
  showIcon?: boolean;
}

export function PeriodComparisonIndicator({
  value,
  prefix,
  className,
  showIcon = true,
}: PeriodComparisonIndicatorProps) {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const isNeutral = value === 0;

  const formatValue = (val: number) => {
    const absValue = Math.abs(val);
    if (absValue >= 1000) {
      return `${(absValue / 1000).toFixed(1)}k`;
    }
    return absValue.toFixed(1);
  };

  const getPeriodLabel = (prefix: string) => {
    switch (prefix) {
      case 'MoM':
        return 'vs last month';
      case 'QoQ':
        return 'vs last quarter';
      case 'YoY':
        return 'vs last year';
      default:
        return 'vs previous period';
    }
  };

  if (isNeutral) {
    return (
      <div className={cn('flex items-center gap-1 text-brand-warm', className)}>
        <span className="text-sm">No change {getPeriodLabel(prefix)}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center gap-1 text-sm font-medium',
        isPositive && 'text-brand-cool',
        isNegative && 'text-destructive',
        className
      )}
    >
      {showIcon && (
        <>
          {isPositive && <TrendingUp className="h-3 w-3" />}
          {isNegative && <TrendingDown className="h-3 w-3" />}
        </>
      )}
      <span>
        {isPositive && '+'}
        {formatValue(value)}% {getPeriodLabel(prefix)}
      </span>
    </div>
  );
}
