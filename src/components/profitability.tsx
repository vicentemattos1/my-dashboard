import { formatCurrency } from '@/utils/formatCurrency';
import { formatPercentage } from '@/utils/formatPercentage';

type ProfitabilityProps = {
  data: {
    costOfSales: number;
    expenses: number;
    grossMargin: number;
    netIncome: number;
    netMargin: number;
    revenues: number;
  };
};

export function Profitability(props: ProfitabilityProps) {
  const { data } = props;

  return (
    <div className="p-4 bg-muted/50 rounded-lg">
      <h3 className="text-base font-semibold mb-3">Profitability Analysis</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Revenues:
            </span>
            <span className="font-bold text-green-600 dark:text-green-400">
              {formatCurrency(data.revenues)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Cost of Sales:
            </span>
            <span className="font-bold text-red-600 dark:text-red-400">
              {formatCurrency(data.costOfSales)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Expenses:
            </span>
            <span className="font-bold text-red-600 dark:text-red-400">
              {formatCurrency(data.expenses)}
            </span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">
                Total Costs:
              </span>
              <span className="font-bold text-red-600 dark:text-red-400">
                {formatCurrency(
                  Math.abs(data.costOfSales) + Math.abs(data.expenses)
                )}
              </span>
            </div>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Net Income:</span>
              <span
                className={`font-bold text-lg ${data.netIncome < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}
              >
                {formatCurrency(data.netIncome)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Gross Margin:
            </span>
            <span className="font-bold text-green-600 dark:text-green-400">
              {formatPercentage(data.grossMargin)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Net Margin:
            </span>
            <span className="font-bold text-green-600 dark:text-green-400">
              {formatPercentage(data.netMargin)}
            </span>
          </div>
          <div className="border-t pt-3">
            <div className="text-sm text-muted-foreground mb-2">Status:</div>
            <div className="text-center p-2 rounded-md bg-background">
              {data.netMargin > 0 ? (
                <span className="text-green-600 dark:text-green-400 font-semibold">
                  ✓ Profitable Operation
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-400 font-semibold">
                  ✗ Operating at Loss
                </span>
              )}
            </div>
          </div>
          <div className="border-t pt-3">
            <div className="text-sm text-muted-foreground mb-2">
              Efficiency Metrics:
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Revenue Efficiency:</span>
                <span className="font-medium">
                  {data.revenues > 0
                    ? `${((data.netIncome / data.revenues) * 100).toFixed(1)}%`
                    : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Cost Ratio:</span>
                <span className="font-medium">
                  {data.revenues > 0
                    ? `${(((Math.abs(data.costOfSales) + Math.abs(data.expenses)) / data.revenues) * 100).toFixed(1)}%`
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
