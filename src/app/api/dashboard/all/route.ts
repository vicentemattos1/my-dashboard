import { readMultipleDataFiles } from '@/utils/read-file';
import { NextResponse } from 'next/server';
import { AllDashboardData, FinancialData } from '../../types/dashboard';

export async function GET(): Promise<
  NextResponse<AllDashboardData | { error: string }>
> {
  try {
    const [monthly, quarterly, yearly] =
      await readMultipleDataFiles<FinancialData>([
        'monthly.json',
        'quarterly.json',
        'yearly.json',
      ]);

    return NextResponse.json({
      monthly,
      quarterly,
      yearly,
    });
  } catch (error) {
    console.error('Error reading dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to load dashboard data' },
      { status: 500 }
    );
  }
}
