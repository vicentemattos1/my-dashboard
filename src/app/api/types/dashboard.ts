export type ChartItem = {
  name: string;
  values: number | number[];
  chartType: 'line' | 'pie' | 'donut' | 'bar' | 'columnStacked';
};

export type FinancialData = {
  mainDashboard: {
    period: string;
    startDate: string;
    endDate: string;
    metricDate: string;
    dateArray: string[];
    charts: {
      cashAtBank: ChartItem[];
      expenseSplit: ChartItem[];
      indirectCashflow: (ChartItem | null)[];
      totalRevenuesSplit: ChartItem[];
      profitLossOverview: ChartItem[];
      salariesSplit: ChartItem[];
      ManpowerOperatingExpenses: ChartItem[];
    };
  };
  mainDashboardKPIs: {
    topKPIs: Array<{
      name: string;
      value: number;
      date?: string;
      mOm?: number;
      type?: string;
    }>;
    KPIs: Array<{
      name: string;
      value: number;
      mom: number;
      prefix: string;
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
