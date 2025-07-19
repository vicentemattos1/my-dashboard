import { NextResponse } from 'next/server';
import { readDataFile } from '@/lib/fileUtils';
import type { ReportApiResponse } from '@/lib/types';

export async function GET(): Promise<
  NextResponse<ReportApiResponse | { error: string }>
> {
  try {
    const data = await readDataFile<ReportApiResponse>('report.json');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading report data:', error);
    return NextResponse.json(
      { error: 'Failed to load report data' },
      { status: 500 }
    );
  }
}
