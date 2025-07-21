import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ReportApiResponse } from '../types/report';

export const reportApi = createApi({
  reducerPath: 'reportApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['ReportData', 'ReportData'],
  endpoints: (builder) => ({
    getAllReportData: builder.query<ReportApiResponse, void>({
      query: () => 'reports',
      providesTags: ['ReportData'],
    }),
  }),
});

export const { useGetAllReportDataQuery } = reportApi;
