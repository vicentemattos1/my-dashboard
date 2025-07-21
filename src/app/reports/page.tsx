'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  RefreshCw,
  DollarSign,
  PieChart,
  BarChart3,
  Target,
  Building2,
  TrendingUpIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { useGetAllReportDataQuery } from '../store/api/reportApi';
import { AnalysisTable } from '@/components/analysis-table';
import { CashFlow } from '@/components/cash-flow-table';
import { Profitability } from '@/components/profitability';
import { FinancialKPIs } from '@/components/financial-kpis';
import { GrowthMetrics } from '@/components/growth-metrics';

const getSectionIcon = (sectionId: string) => {
  switch (sectionId) {
    case 'financial':
      return <DollarSign className="h-5 w-5 text-green-600" />;
    case 'assets':
      return <Building2 className="h-5 w-5 text-blue-600" />;
    case 'kpis':
      return <Target className="h-5 w-5 text-purple-600" />;
    default:
      return <BarChart3 className="h-5 w-5 text-gray-600" />;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'chart':
    case 'line':
    case 'bar':
      return <BarChart3 className="h-4 w-4 text-blue-500" />;
    case 'pie':
    case 'donut':
      return <PieChart className="h-4 w-4 text-orange-500" />;
    case 'metric':
      return <TrendingUpIcon className="h-4 w-4 text-green-500" />;
    default:
      return <BarChart3 className="h-4 w-4 text-gray-500" />;
  }
};

export default function ReportsPage() {
  const {
    data: reportResponse,
    isLoading,
    refetch,
  } = useGetAllReportDataQuery();

  const reportData = reportResponse?.reportData;

  const handleRefresh = () => {
    toast.promise(refetch().unwrap(), {
      loading: 'Refreshing report...',
      success: 'Report refreshed successfully!',
      error: 'Failed to refresh report',
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-9 w-32" />
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-72" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="text-center text-muted-foreground">
        No report data available
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {reportData.title}
          </h1>
          <p className="text-muted-foreground">Period: {reportData.period}</p>
        </div>
        <Button onClick={handleRefresh} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Report
        </Button>
      </div>

      <Accordion type="multiple" className="space-y-4">
        {reportData.sections.map((section) => (
          <Card key={section.id}>
            <AccordionItem value={section.id} className="border-none">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center justify-between w-full text-left">
                  <div className="flex items-center gap-3">
                    {getSectionIcon(section.id)}
                    <div>
                      <h2 className="text-xl font-semibold">{section.title}</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-4">
                    {section.items.length} items
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <Separator className="mb-4" />
                <Accordion type="single" collapsible className="space-y-2">
                  {section.items.map((item) => (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      className="border rounded-lg"
                    >
                      <AccordionTrigger className="px-4 py-3 text-left">
                        <div className="flex items-center w-full gap-2">
                          {getTypeIcon(item.type)}
                          <h3 className="font-medium">{item.title}</h3>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <p className="text-sm text-muted-foreground mb-4">
                          {item.description}
                        </p>
                        <div className="space-y-6">
                          <ContentWrapper
                            contentType={item.id as IdOptions}
                            value={item.data}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Card>
        ))}
      </Accordion>
    </div>
  );
}

type IdOptions =
  | 'revenue-breakdown'
  | 'expense-analysis'
  | 'cash-assets'
  | 'cash-flow'
  | 'profitability'
  | 'financial-kpis'
  | 'growth-metrics';

type ContentWrapperProps = {
  contentType: IdOptions;
  value: any;
};

function ContentWrapper({ contentType, value }: ContentWrapperProps) {
  if (
    contentType === 'revenue-breakdown' ||
    contentType === 'expense-analysis' ||
    contentType === 'cash-assets'
  ) {
    return <AnalysisTable data={value} />;
  }
  if (contentType === 'cash-flow') {
    return <CashFlow data={value} />;
  }
  if (contentType === 'profitability') {
    return <Profitability data={value} />;
  }
  if (contentType === 'financial-kpis') {
    return <FinancialKPIs data={value} />;
  }
  if (contentType === 'growth-metrics') {
    return <GrowthMetrics data={value} />;
  }
  return null;
}
