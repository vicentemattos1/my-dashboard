import { DashboardData, FinancialData } from '@/app/api/types/dashboard';
import { useGetAllDashboardDataQuery } from '@/app/store/api/dashboardApi';
import { useMemo } from 'react';

const CHART_COLORS = [
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

// Updated DashboardData interface to include KPI comparisons
interface ExtendedDashboardData extends DashboardData {
  kpiComparisons: {
    revenue: { value: number; change: number; prefix: string };
    expenses: { value: number; change: number; prefix: string };
    grossProfit: { value: number; change: number; prefix: string };
    netIncome: { value: number; change: number; prefix: string };
  };
}

export function useDashboardData() {
  const {
    data: allData,
    error,
    isLoading,
    refetch,
  } = useGetAllDashboardDataQuery();

  const data = useMemo(() => {
    if (!allData) {
      return {
        monthlyData: null,
        quarterlyData: null,
        yearlyData: null,
      };
    }
    return {
      monthlyData: transformFinancialData(allData.monthly),
      quarterlyData: transformFinancialData(allData.quarterly),
      yearlyData: transformFinancialData(allData.yearly),
    };
  }, [allData]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}

const transformFinancialData = (
  financialData: FinancialData
): ExtendedDashboardData => {
  const { mainDashboard, mainDashboardKPIs } = financialData;

  // Calculate total revenue from totalRevenuesSplit
  const totalRevenue = mainDashboard.charts.totalRevenuesSplit.reduce(
    (sum, item) => sum + Math.abs(item.values),
    0
  );

  // Calculate total expenses from expenseSplit (use absolute values)
  const totalExpenses = mainDashboard.charts.expenseSplit.reduce(
    (sum, item) => sum + Math.abs(item.values),
    0
  );

  // Get cash at bank from KPIs
  const cashAtBank =
    mainDashboardKPIs.topKPIs.find((kpi) =>
      kpi.name.toLowerCase().includes('cash')
    )?.value || 0;

  // Extract KPI comparisons
  const revenueKPI = mainDashboardKPIs.KPIs.find(
    (kpi) => kpi.name === 'Revenues'
  );
  const expensesKPI = mainDashboardKPIs.KPIs.find(
    (kpi) => kpi.name === 'Expenses'
  );
  const grossProfitKPI = mainDashboardKPIs.KPIs.find(
    (kpi) => kpi.name === 'Gross Profit'
  );
  const netIncomeKPI = mainDashboardKPIs.KPIs.find(
    (kpi) => kpi.name === 'Net Income/(Loss)'
  );

  // Transform revenue data for chart
  const chartData = mainDashboard.dateArray.map((date, index) => {
    const revenueData = mainDashboard.charts.profitLossOverview.find(
      (item) => item.name === 'Revenues'
    );
    const expenseData = mainDashboard.charts.profitLossOverview.find(
      (item) => item.name === 'Expenses'
    );

    return {
      name: date,
      users: Math.abs(revenueData?.values[index] || 0) / 1000, // Scale down for display
      revenue: Math.abs(revenueData?.values[index] || 0),
      conversions: Math.abs(expenseData?.values[index] || 0),
    };
  });

  // Transform expense split for categories (filter positive values and sort)
  const expenseCategories = mainDashboard.charts.expenseSplit
    .filter((item) => item.values > 0) // Only positive expenses
    .sort((a, b) => b.values - a.values) // Sort by value descending
    .slice(0, 8) // Take top 8 categories
    .map((item, index) => ({
      name: item.name,
      value: Math.round((item.values / totalExpenses) * 100), // Convert to percentage
      color: CHART_COLORS[index % CHART_COLORS.length],
    }));

  return {
    title: `${mainDashboard.period.charAt(0).toUpperCase() + mainDashboard.period.slice(1)} Financial Dashboard`,
    period: mainDashboard.period,
    summary: {
      totalUsers: Math.round(totalRevenue / 1000), // Use revenue as "users" metric
      activeUsers: Math.round(cashAtBank / 1000), // Use cash as "active users"
      revenue: totalRevenue,
      conversionRate:
        totalExpenses > 0
          ? Math.round((totalRevenue / totalExpenses) * 100) / 100
          : 0,
    },
    chartData,
    categories: expenseCategories,
    kpiComparisons: {
      revenue: {
        value: revenueKPI?.value || 0,
        change: revenueKPI?.mom || 0,
        prefix: revenueKPI?.prefix || 'MoM',
      },
      expenses: {
        value: Math.abs(expensesKPI?.value || 0),
        change: expensesKPI?.mom || 0,
        prefix: expensesKPI?.prefix || 'MoM',
      },
      grossProfit: {
        value: grossProfitKPI?.value || 0,
        change: grossProfitKPI?.mom || 0,
        prefix: grossProfitKPI?.prefix || 'MoM',
      },
      netIncome: {
        value: netIncomeKPI?.value || 0,
        change: netIncomeKPI?.mom || 0,
        prefix: netIncomeKPI?.prefix || 'MoM',
      },
    },
  };
};
