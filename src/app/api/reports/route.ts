import { NextResponse } from 'next/server';
import { readDataFile } from '@/utils/read-file';
import { ReportApiResponse } from '../types/reports';

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
