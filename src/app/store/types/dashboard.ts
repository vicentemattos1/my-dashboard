export interface DashboardData {
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
}
