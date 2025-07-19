import { NextResponse } from 'next/server';
import { readDataFile } from '@/lib/fileUtils';
import type { FinancialData } from '@/lib/types';

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
