import { readDataFile } from '@/utils/read-file';
import { NextResponse } from 'next/server';
import { FinancialData } from '../../types/dashboard';

export async function GET(): Promise<
  NextResponse<FinancialData | { error: string }>
> {
  try {
    const data = await readDataFile<FinancialData>('quarterly.json');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading quarterly data:', error);
    return NextResponse.json(
      { error: 'Failed to load quarterly data' },
      { status: 500 }
    );
  }
}
