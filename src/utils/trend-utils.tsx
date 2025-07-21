import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import React from 'react';

export const getTrendIcon = (
  trend: string,
  size: 'sm' | 'md' | 'lg' = 'md'
): React.ReactElement => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const iconSize = sizeClasses[size];

  switch (trend) {
    case 'up':
      return <TrendingUp className={`${iconSize} text-brand-cool`} />;
    case 'down':
      return <TrendingDown className={`${iconSize} text-destructive`} />;
    default:
      return <Minus className={`${iconSize} text-brand-warm`} />;
  }
};
