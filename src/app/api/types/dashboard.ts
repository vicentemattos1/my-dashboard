export type FinancialData = {
  mainDashboard: {
    period: string;
    dateArray: string[];
    charts: {
      expenseSplit: Array<{
        name: string;
        values: number;
      }>;
      totalRevenuesSplit: Array<{
        name: string;
        values: number;
      }>;
      profitLossOverview: Array<{
        name: string;
        values: number[];
      }>;
    };
  };
  mainDashboardKPIs: {
    topKPIs: Array<{
      name: string;
      value: number;
    }>;
  };
};

export type DashboardData = {
  title: string;
  period: string;
  summary: {
    totalUsers: number;
    activeUsers: number;
    revenue: number;
    conversionRate: number;
  };
  chartData: Array<{
    name: string;
    users: number;
    revenue: number;
    conversions: number;
  }>;
  categories: Array<{
    name: string;
    value: number;
    color: string;
  }>;
};

export type AllDashboardData = {
  monthly: FinancialData;
  quarterly: FinancialData;
  yearly: FinancialData;
};
