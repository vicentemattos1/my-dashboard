import { FinancialData } from '@/app/api/types/dashboard';
import { baseApi } from './baseApi';

export const dashboardApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ['DashboardData'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getMonthlyData: builder.query<FinancialData, void>({
        query: () => 'dashboard/monthly',
        providesTags: ['DashboardData'],
      }),
      getQuarterlyData: builder.query<FinancialData, void>({
        query: () => 'dashboard/quarterly',
        providesTags: ['DashboardData'],
      }),
      getYearlyData: builder.query<FinancialData, void>({
        query: () => 'dashboard/yearly',
        providesTags: ['DashboardData'],
      }),
      getAllDashboardData: builder.query<
        {
          monthly: FinancialData;
          quarterly: FinancialData;
          yearly: FinancialData;
        },
        void
      >({
        query: () => 'dashboard/all',
        providesTags: ['DashboardData'],
      }),
    }),
  });

export const {
  useGetMonthlyDataQuery,
  useGetQuarterlyDataQuery,
  useGetYearlyDataQuery,
  useGetAllDashboardDataQuery,
} = dashboardApi;
