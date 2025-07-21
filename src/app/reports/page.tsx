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
import { RefreshCw, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { toast } from 'sonner';
import { useGetAllReportDataQuery } from '../store/api/reportApi';

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

  const getTrendIcon = (value: string) => {
    if (value.startsWith('+'))
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (value.startsWith('-'))
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const renderDataValue = (key: string, value: any): React.ReactNode => {
    if (Array.isArray(value)) {
      return (
        <div className="space-y-2">
          {value.map((item, index) => (
            <Card key={index} className="p-3 bg-muted/50">
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(item).map(([itemKey, itemValue]) => (
                  <div key={itemKey} className="flex justify-between">
                    <span className="capitalize text-muted-foreground">
                      {itemKey}:
                    </span>
                    <span className="font-medium">{String(itemValue)}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      );
    }

    if (
      typeof value === 'string' &&
      (value.includes('%') || value.includes('$'))
    ) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">{value}</span>
          {value.includes('%') &&
            (value.includes('+') || value.includes('-')) &&
            getTrendIcon(value)}
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <div className="space-y-2">
          {Object.entries(value).map(([subKey, subValue]) => (
            <div key={subKey} className="flex justify-between items-center">
              <span className="capitalize text-muted-foreground">
                {subKey.replace(/([A-Z])/g, ' $1').toLowerCase()}:
              </span>
              <span className="font-medium">{String(subValue)}</span>
            </div>
          ))}
        </div>
      );
    }

    return <span className="font-medium">{String(value)}</span>;
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
                  <div>
                    <h2 className="text-xl font-semibold">{section.title}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {section.description}
                    </p>
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
                        <div className="flex items-center justify-between w-full">
                          <h3 className="font-medium">{item.title}</h3>
                          <Badge variant="outline" className="ml-2">
                            {item.type}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <p className="text-sm text-muted-foreground mb-4">
                          {item.description}
                        </p>
                        <div className="space-y-4">
                          {Object.entries(item.data).map(([key, value]) => (
                            <div key={key} className="space-y-2">
                              <h4 className="text-sm font-medium text-muted-foreground capitalize">
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                              </h4>
                              {renderDataValue(key, value)}
                            </div>
                          ))}
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
