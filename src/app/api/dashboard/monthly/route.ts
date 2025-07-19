import { readDataFile } from '@/utils/read-file';
import { NextResponse } from 'next/server';
import { FinancialData } from '../../types/dashboard';

export async function GET(): Promise<
  NextResponse<FinancialData | { error: string }>
> {
  try {
    const data = await readDataFile<FinancialData>('monthly.json');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading monthly data:', error);
    return NextResponse.json(
      { error: 'Failed to load monthly data' },
      { status: 500 }
    );
  }
}
