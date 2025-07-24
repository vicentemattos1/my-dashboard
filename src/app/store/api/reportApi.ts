import { baseApi } from './baseApi';
import { ReportApiResponse } from '../types/report';

export const reportApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ['ReportData'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllReportData: builder.query<ReportApiResponse, void>({
        query: () => 'reports',
        providesTags: ['ReportData'],
      }),
    }),
  });

export const { useGetAllReportDataQuery } = reportApi;
