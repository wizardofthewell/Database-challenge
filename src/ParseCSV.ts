import fs from 'fs';
import csv from 'csv-parser';
import { sqlServer, createTable } from './sqlConnection';

async function parseCSV(filePath: string) {
    await createTable();

    const totalRows = 100000;
    let counter = 0;
    let lastLoggedPercentage = 0;

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', async (row) => {
                const mappedRow = {
                    Index: row['Index'],
                    User_Id: row['User Id'],
                    First_Name: row['First Name'],
                    Last_Name: row['Last Name'],
                    Sex: row['Sex'],
                    Email: row['Email'],
                    Phone: row['Phone'],
                    Date_of_birth: row['Date of birth'],
                    Job_Title: row['Job Title'],
                };
                try {
                    await sqlServer.query('INSERT INTO people SET ?', mappedRow);
                    counter++;
                    const currentPercentage = Math.floor((counter / totalRows) * 100);
                    if (currentPercentage >= lastLoggedPercentage + 5) {
                        console.log(`Progress: ${currentPercentage}%`);
                        lastLoggedPercentage = currentPercentage;
                    }
                } catch (error) {
                    reject(error);
                }
            })
            .on('end', resolve)
            .on('error', reject);
    });
}
export { parseCSV };