'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ChartItem } from '@/app/api/types/dashboard';

interface DynamicChartProps {
  data: ChartItem[];
  dateArray?: string[];
  title: string;
  description?: string;
  height?: number;
  colors?: string[];
}

const DEFAULT_COLORS = [
  '#B09280',
  '#698AC5',
  '#22c55e',
  '#262626',
  '#a855f7',
  '#ef4444',
  '#f97316',
  '#eab308',
  '#84cc16',
  '#06b6d4',
  '#8b5cf6',
  '#ec4899',
];

// Helper function to format numbers in K format
const formatNumberToK = (value: number): string => {
  const absValue = Math.abs(value);
  if (absValue >= 1000) {
    const kValue = absValue / 1000;
    // Show decimals only if necessary
    const formattedK = kValue % 1 === 0 ? kValue.toString() : kValue.toFixed(1);
    return `${value < 0 ? '-' : ''}${formattedK}K`;
  }
  return value.toString();
};

// Helper function for currency formatting with K
const formatCurrencyToK = (value: number): string => {
  const absValue = Math.abs(value);
  if (absValue >= 1000) {
    const kValue = absValue / 1000;
    const formattedK = kValue % 1 === 0 ? kValue.toString() : kValue.toFixed(1);
    return `$${value < 0 ? '-' : ''}${formattedK}K`;
  }
  return `$${value}`;
};

export function DynamicChart({
  data,
  dateArray = [],
  title: _title,
  description: _description,
  height = 300,
  colors = DEFAULT_COLORS,
}: DynamicChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No chart data available
      </div>
    );
  }

  // Filter out null values
  const filteredData = data.filter((item): item is ChartItem => item !== null);

  if (filteredData.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No valid chart data available
      </div>
    );
  }

  const firstChartType = filteredData[0].chartType;

  // For line charts, bar charts, and stacked columns - transform data for time series
  if (['line', 'bar', 'columnStacked'].includes(firstChartType)) {
    const chartData = dateArray.map((date, index) => {
      const dataPoint: any = { name: date };
      filteredData.forEach((item) => {
        if (Array.isArray(item.values)) {
          dataPoint[item.name] = item.values[index] || 0;
        }
      });
      return dataPoint;
    });

    if (firstChartType === 'line') {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={formatNumberToK} />
            <Tooltip
              formatter={(value, name) => [
                formatCurrencyToK(Number(value)),
                name,
              ]}
            />
            <Legend />
            {filteredData.map((item, index) => (
              <Line
                key={item.name}
                type="monotone"
                dataKey={item.name}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (firstChartType === 'bar' || firstChartType === 'columnStacked') {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={formatNumberToK} />
            <Tooltip
              formatter={(value, name) => [
                formatCurrencyToK(Number(value)),
                name,
              ]}
            />
            <Legend />
            {filteredData.map((item, index) => (
              <Bar
                key={item.name}
                dataKey={item.name}
                fill={colors[index % colors.length]}
                stackId={
                  firstChartType === 'columnStacked' ? 'stack' : undefined
                }
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      );
    }
  }

  // For pie charts and donut charts - use single values
  if (['pie', 'donut'].includes(firstChartType)) {
    const pieData = filteredData
      .filter((item) => typeof item.values === 'number' && item.values > 0)
      .map((item) => ({
        name: item.name,
        value: typeof item.values === 'number' ? Math.abs(item.values) : 0,
      }));

    const innerRadius = firstChartType === 'donut' ? 40 : 0;

    return (
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ percent }) =>
              percent && percent > 0.05 ? `${(percent * 100).toFixed(1)}%` : ''
            }
            outerRadius={80}
            innerRadius={innerRadius}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [formatCurrencyToK(Number(value)), 'Value']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return (
    <div className="text-center text-muted-foreground py-8">
      Unsupported chart type: {firstChartType}
    </div>
  );
}
