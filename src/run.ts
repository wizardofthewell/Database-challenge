import { parseCSV } from './ParseCSV';

async function run() {
  try {
    await parseCSV('Database/people-100000.csv');
    console.log('CSV file has been parsed successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

run();