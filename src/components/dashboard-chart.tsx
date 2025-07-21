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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

interface ChartData {
  name: string;
  users: number;
  revenue: number;
  conversions: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface KPIComparison {
  value: number;
  change: number;
  prefix: string;
}

interface DashboardData {
  title: string;
  period: string;
  summary: {
    totalUsers: number;
    activeUsers: number;
    revenue: number;
    conversionRate: number;
  };
  chartData: ChartData[];
  categories: CategoryData[];
  kpiComparisons: {
    revenue: KPIComparison;
    expenses: KPIComparison;
    grossProfit: KPIComparison;
    netIncome: KPIComparison;
  };
}

interface DashboardChartProps {
  data: DashboardData | null;
  isLoading: boolean;
}

export function DashboardChart({ data, isLoading }: DashboardChartProps) {
  const period = `${data?.period[0].toUpperCase()}${data?.period.slice(1, data.period.length)}`;
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
  console.log(data);
  if (!data) {
    return (
      <div className="text-center text-muted-foreground">No data available</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="px-3 md:px-6 md:pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="md:text-2xl" data-testid="revenue-value">
              ${data.kpiComparisons.revenue.value.toLocaleString()}
            </CardTitle>
            <PeriodComparisonIndicator
              value={data.kpiComparisons.revenue.change}
              prefix={data.kpiComparisons.revenue.prefix}
            />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Expenses</CardDescription>
            <CardTitle className="md:text-2xl">
              ${data.kpiComparisons.expenses.value.toLocaleString()}
            </CardTitle>
            <PeriodComparisonIndicator
              value={data.kpiComparisons.expenses.change}
              prefix={data.kpiComparisons.expenses.prefix}
            />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Gross Profit</CardDescription>
            <CardTitle className="md:text-2xl">
              ${data.kpiComparisons.grossProfit.value.toLocaleString()}
            </CardTitle>
            <PeriodComparisonIndicator
              value={data.kpiComparisons.grossProfit.change}
              prefix={data.kpiComparisons.grossProfit.prefix}
            />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Net Income</CardDescription>
            <CardTitle className="md:text-2xl">
              ${data.kpiComparisons.netIncome.value.toLocaleString()}
            </CardTitle>
            <PeriodComparisonIndicator
              value={data.kpiComparisons.netIncome.change}
              prefix={data.kpiComparisons.netIncome.prefix}
            />
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Expense Trend</CardTitle>
            <CardDescription>
              {period} financial performance overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => {
                    const numValue = Number(value);
                    if (name === 'revenue')
                      return [`$${numValue.toLocaleString()}`, 'Revenue'];
                    if (name === 'users')
                      return [
                        `$${(numValue * 1000).toLocaleString()}`,
                        'Revenue (K)',
                      ];
                    if (name === 'conversions')
                      return [`$${numValue.toLocaleString()}`, 'Expenses'];
                    return [value, name];
                  }}
                />
                <Bar dataKey="users" fill="#3b82f6" name="users" />
                <Bar dataKey="conversions" fill="#ef4444" name="conversions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Category Distribution</CardTitle>
            <CardDescription>Top expense categories breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={data.categories}
                  cx="50%"
                  cy="40%"
                  labelLine={false}
                  label={({ value }) =>
                    value && value > 0 ? `${value}%` : null
                  }
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                <Legend verticalAlign="bottom" height={120} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
