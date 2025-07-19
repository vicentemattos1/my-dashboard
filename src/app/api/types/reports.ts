export interface ReportData {
  title: string;
  period: string;
  sections: Array<{
    id: string;
    title: string;
    description: string;
    items: Array<{
      id: string;
      title: string;
      type: string;
      description: string;
      data: Record<string, any>;
    }>;
  }>;
}

export interface ReportApiResponse {
  reportData: ReportData;
}
