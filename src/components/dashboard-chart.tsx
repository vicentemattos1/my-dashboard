'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
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
}

interface DashboardChartProps {
  data: DashboardData | null;
  isLoading: boolean;
}

export function DashboardChart({ data, isLoading }: DashboardChartProps) {
  const period = `${data?.period[0].toUpperCase()}${data?.period.slice(1, data.period.length)}`;
  if (isLoading) {
    return (
      <div className="space-y-6">
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue (K)</CardDescription>
            <CardTitle className="text-2xl">
              {data.summary.totalUsers.toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Cash at Bank (K)</CardDescription>
            <CardTitle className="text-2xl">
              {data.summary.activeUsers.toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-2xl">
              ${data.summary.revenue.toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Revenue/Expense Ratio</CardDescription>
            <CardTitle className="text-2xl">
              {data.summary.conversionRate}x
            </CardTitle>
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
                <Bar dataKey="users" fill="var(--color-chart-1)" name="users" />
                <Bar
                  dataKey="conversions"
                  fill="var(--color-chart-3)"
                  name="conversions"
                />
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
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.categories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) =>
                    value && value > 0 ? `${name} ${value}%` : null
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
