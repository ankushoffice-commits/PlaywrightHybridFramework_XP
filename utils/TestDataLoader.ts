import * as fs from 'fs';
import * as path from 'path';

export class TestDataLoader {
  static loadData<T>(fileName: string): T {
    const filePath = path.join(__dirname, '..', 'tests', fileName);
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error loading test data from ${filePath}:`, error);
      throw new Error(`Failed to load ${fileName}`);
    }
  }
}