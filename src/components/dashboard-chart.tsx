'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PeriodComparisonIndicator } from '@/components/period-comparison-indicator';
import { DynamicChart } from '@/components/dynamic-chart';
import { FinancialData, ChartItem } from '@/app/api/types/dashboard';

interface KPIComparison {
  value: number;
  change: number;
  prefix: string;
}

interface ExtendedDashboardData {
  title: string;
  period: string;
  financialData: FinancialData;
  kpiComparisons: {
    revenue: KPIComparison;
    expenses: KPIComparison;
    grossProfit: KPIComparison;
    netIncome: KPIComparison;
  };
}

interface DashboardChartProps {
  data: ExtendedDashboardData | null;
  isLoading: boolean;
}

// Helper function to format currency values in K format
const formatCurrencyKPI = (value: number): string => {
  const absValue = Math.abs(value);
  if (absValue >= 1000) {
    const kValue = absValue / 1000;
    const formattedK = kValue % 1 === 0 ? kValue.toString() : kValue.toFixed(1);
    return `$${value < 0 ? '-' : ''}${formattedK}K`;
  }
  return `$${value}`;
};

export function DashboardChart({ data, isLoading }: DashboardChartProps) {
  const period = data?.period
    ? `${data.period[0].toUpperCase()}${data.period.slice(1)}`
    : '';

  if (isLoading) {
    return (
      <div className="space-y-6" data-testid="dashboard-loading">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-1.5">
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-8 w-32" />
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-8 w-32" />
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-8 w-32" />
            </CardHeader>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-80 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-80 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center text-muted-foreground">No data available</div>
    );
  }

  const { financialData, kpiComparisons } = data;
  const { mainDashboard } = financialData;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="px-3 md:px-6 md:pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="md:text-2xl" data-testid="revenue-value">
              {formatCurrencyKPI(kpiComparisons.revenue.value)}
            </CardTitle>
            <PeriodComparisonIndicator
              value={kpiComparisons.revenue.change}
              prefix={kpiComparisons.revenue.prefix}
            />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Expenses</CardDescription>
            <CardTitle className="md:text-2xl">
              {formatCurrencyKPI(kpiComparisons.expenses.value)}
            </CardTitle>
            <PeriodComparisonIndicator
              value={kpiComparisons.expenses.change}
              prefix={kpiComparisons.expenses.prefix}
            />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Gross Profit</CardDescription>
            <CardTitle className="md:text-2xl">
              {formatCurrencyKPI(kpiComparisons.grossProfit.value)}
            </CardTitle>
            <PeriodComparisonIndicator
              value={kpiComparisons.grossProfit.change}
              prefix={kpiComparisons.grossProfit.prefix}
            />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Net Income</CardDescription>
            <CardTitle className="md:text-2xl">
              {formatCurrencyKPI(kpiComparisons.netIncome.value)}
            </CardTitle>
            <PeriodComparisonIndicator
              value={kpiComparisons.netIncome.change}
              prefix={kpiComparisons.netIncome.prefix}
            />
          </CardHeader>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash at Bank Chart */}
        {mainDashboard.charts.cashAtBank.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Cash at Bank</CardTitle>
              <CardDescription>
                {period} cash flow and bank account balances
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DynamicChart
                data={mainDashboard.charts.cashAtBank}
                dateArray={mainDashboard.dateArray}
                title="Cash at Bank"
                height={300}
              />
            </CardContent>
          </Card>
        )}

        {/* Profit Loss Overview Chart */}
        {mainDashboard.charts.profitLossOverview.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Profit & Loss Overview</CardTitle>
              <CardDescription>
                {period} revenues, expenses, and net income trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DynamicChart
                data={mainDashboard.charts.profitLossOverview}
                dateArray={mainDashboard.dateArray}
                title="Profit & Loss Overview"
                height={300}
              />
            </CardContent>
          </Card>
        )}

        {/* Expense Split Chart */}
        {mainDashboard.charts.expenseSplit.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Expense Category Distribution</CardTitle>
              <CardDescription>
                Breakdown of expenses by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DynamicChart
                data={mainDashboard.charts.expenseSplit}
                title="Expense Split"
                height={400}
              />
            </CardContent>
          </Card>
        )}

        {/* Total Revenues Split Chart */}
        {mainDashboard.charts.totalRevenuesSplit.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Revenue Sources</CardTitle>
              <CardDescription>Revenue breakdown by source</CardDescription>
            </CardHeader>
            <CardContent>
              <DynamicChart
                data={mainDashboard.charts.totalRevenuesSplit}
                title="Revenue Sources"
                height={400}
              />
            </CardContent>
          </Card>
        )}

        {/* Indirect Cashflow Chart */}
        {mainDashboard.charts.indirectCashflow.some(
          (item) => item !== null
        ) && (
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow Operations</CardTitle>
              <CardDescription>
                {period} cash flow from operations and investments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DynamicChart
                data={mainDashboard.charts.indirectCashflow.filter(
                  (item): item is ChartItem => item !== null
                )}
                dateArray={mainDashboard.dateArray}
                title="Cash Flow Operations"
                height={300}
              />
            </CardContent>
          </Card>
        )}

        {/* Salaries Split Chart */}
        {mainDashboard.charts.salariesSplit.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Salary Distribution</CardTitle>
              <CardDescription>Employee salary breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <DynamicChart
                data={mainDashboard.charts.salariesSplit}
                title="Salary Distribution"
                height={300}
              />
            </CardContent>
          </Card>
        )}

        {/* Manpower Operating Expenses Chart */}
        {mainDashboard.charts.ManpowerOperatingExpenses.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Manpower Operating Expenses</CardTitle>
              <CardDescription>
                Operating expenses related to manpower
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DynamicChart
                data={mainDashboard.charts.ManpowerOperatingExpenses}
                title="Manpower Operating Expenses"
                height={300}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
