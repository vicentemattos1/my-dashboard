import { formatCurrency } from '@/utils/formatCurrency';
import { formatPercentage } from '@/utils/formatPercentage';

type ProfitabilityData = {
  revenues: number;
  costOfSales: number;
  expenses: number;
  grossMargin: number;
  netMargin: number;
  netIncome: number;
};

interface ProfitabilityProps {
  data: ProfitabilityData;
}

export function Profitability(props: ProfitabilityProps) {
  const { data } = props;

  return (
    <div className="p-4 bg-brand-light/30 dark:bg-brand-neutral/20 rounded-lg border border-brand-light/50">
      <h3 className="text-base font-semibold mb-3 text-brand-neutral">
        Profitability Analysis
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Revenues:
            </span>
            <span className="font-bold text-brand-cool dark:text-brand-cool">
              {formatCurrency(data.revenues)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Cost of Sales:
            </span>
            <span className="font-bold text-destructive dark:text-destructive">
              {formatCurrency(data.costOfSales)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Expenses:
            </span>
            <span className="font-bold text-destructive dark:text-destructive">
              {formatCurrency(data.expenses)}
            </span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">
                Total Costs:
              </span>
              <span className="font-bold text-destructive dark:text-destructive">
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
                className={`font-bold text-lg ${data.netIncome < 0 ? 'text-destructive dark:text-destructive' : 'text-brand-cool dark:text-brand-cool'}`}
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
            <span className="font-bold text-brand-cool dark:text-brand-cool">
              {formatPercentage(data.grossMargin)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Net Margin:
            </span>
            <span className="font-bold text-brand-cool dark:text-brand-cool">
              {formatPercentage(data.netMargin)}
            </span>
          </div>
          <div className="border-t pt-3">
            <div className="text-sm text-muted-foreground mb-2">Status:</div>
            <div className="text-center p-2 rounded-md bg-background border border-brand-light/30">
              {data.netMargin > 0 ? (
                <span className="text-brand-cool dark:text-brand-cool font-semibold">
                  ✓ Profitable Operation
                </span>
              ) : (
                <span className="text-destructive dark:text-destructive font-semibold">
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
