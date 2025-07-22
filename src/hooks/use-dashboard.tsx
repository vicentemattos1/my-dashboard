import { FinancialData } from '@/app/api/types/dashboard';
import { useGetAllDashboardDataQuery } from '@/app/store/api/dashboardApi';
import { useMemo } from 'react';

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

  // Extract KPI data for comparison cards
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

  return {
    title: `${mainDashboard.period.charAt(0).toUpperCase() + mainDashboard.period.slice(1)} Financial Dashboard`,
    period: mainDashboard.period,
    financialData,
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
