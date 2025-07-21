import { formatCurrency } from '@/utils/formatCurrency';
import { formatPercentage } from '@/utils/formatPercentage';

export const formatValue = (value: number, unit: string) => {
  if (unit === '$') {
    return formatCurrency(value);
  }
  if (unit === '%') {
    return formatPercentage(value / 100);
  }
  return `${value.toLocaleString()}${unit}`;
};

export const formatChange = (change: number, unit: string) => {
  const prefix = change >= 0 ? '+' : '';
  if (unit === '$') {
    return `${prefix}${formatCurrency(change)}`;
  }
  if (unit === '%') {
    return `${prefix}${formatPercentage(change / 100)}`;
  }
  return `${prefix}${change.toLocaleString()}${unit}`;
};
