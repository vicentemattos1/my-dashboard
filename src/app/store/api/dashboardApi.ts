import { FinancialData } from '@/app/api/types/dashboard';
import { baseApi } from './baseApi';

const dashboardApiWithTags = baseApi.enhanceEndpoints({
  addTagTypes: ['DashboardData'],
});

export const dashboardApi = dashboardApiWithTags.injectEndpoints({
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
  overrideExisting: false,
});

export const {
  useGetMonthlyDataQuery,
  useGetQuarterlyDataQuery,
  useGetYearlyDataQuery,
  useGetAllDashboardDataQuery,
} = dashboardApi;
