import { baseApi } from './baseApi';
import { ReportApiResponse } from '../types/report';

const reportApiWithTags = baseApi.enhanceEndpoints({
  addTagTypes: ['ReportData'],
});

export const reportApi = reportApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getAllReportData: builder.query<ReportApiResponse, void>({
      query: () => 'reports',
      providesTags: ['ReportData'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllReportDataQuery } = reportApi;
