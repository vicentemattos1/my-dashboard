export const formatCurrency = (value: number, useKFormat: boolean = true) => {
  // If using K format and value is >= 1000, format as K
  if (useKFormat) {
    const absValue = Math.abs(value);
    if (absValue >= 1000) {
      const kValue = absValue / 1000;
      const formattedK =
        kValue % 1 === 0 ? kValue.toString() : kValue.toFixed(1);
      return `$${value < 0 ? '-' : ''}${formattedK}K`;
    }
  }

  // For values < 1000 or when K format is disabled, use standard formatting
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
};
