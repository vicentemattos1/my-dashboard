'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { DashboardChart } from '@/components/dashboard-chart';
import { toast } from 'sonner';
import { useDashboardData } from '@/hooks/use-dashboard';

export default function Home() {
  const [activeTab, setActiveTab] = useState('monthly');

  const { data, isLoading, refetch } = useDashboardData();
  const { monthlyData, quarterlyData, yearlyData } = data;

  const handleRefresh = () => {
    toast.promise(refetch().unwrap(), {
      loading: 'Refreshing data...',
      success: 'Data refreshed successfully!',
      error: 'Failed to refresh data',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground">
            Comprehensive analytics and performance metrics
          </p>
        </div>
        <Button onClick={handleRefresh} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4 bg-red"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Analytics</CardTitle>
              <CardDescription>
                Current month performance and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DashboardChart data={monthlyData} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quarterly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quarterly Analytics</CardTitle>
              <CardDescription>
                Quarterly performance overview and comparison
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DashboardChart data={quarterlyData} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yearly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Yearly Analytics</CardTitle>
              <CardDescription>
                Annual performance and growth metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DashboardChart data={yearlyData} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
