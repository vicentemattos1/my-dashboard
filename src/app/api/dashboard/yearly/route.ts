import { readDataFile } from '@/utils/read-file';
import { NextResponse } from 'next/server';
import { FinancialData } from '../../types/dashboard';

export async function GET(): Promise<
  NextResponse<FinancialData | { error: string }>
> {
  try {
    const data = await readDataFile<FinancialData>('yearly.json');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading yearly data:', error);
    return NextResponse.json(
      { error: 'Failed to load yearly data' },
      { status: 500 }
    );
  }
}
