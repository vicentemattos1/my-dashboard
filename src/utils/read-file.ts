import path from 'path';
import { promises as fs } from 'fs';

export function getDataFilePath(filename: string): string {
  return path.join(process.cwd(), 'src', 'data', filename);
}

export async function readDataFile<T = any>(filename: string): Promise<T> {
  const filePath = getDataFilePath(filename);
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function readMultipleDataFiles<T = any>(
  filenames: string[]
): Promise<T[]> {
  const readPromises = filenames.map((filename) => readDataFile<T>(filename));
  return Promise.all(readPromises);
}
