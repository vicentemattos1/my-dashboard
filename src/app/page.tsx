'use client';

import { useGetAllDashboardDataQuery } from './store/api/dashboardApi';

export default function Home() {
  const { data: allData } = useGetAllDashboardDataQuery();

  return <div>{JSON.stringify(allData)}</div>;
}
