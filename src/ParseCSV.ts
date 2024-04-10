import fs from 'fs';
import csv from 'csv-parser';
import { sqlServer, createTable } from './sqlConnection';

async function parseCSV(filePath: string) {
    await createTable();

    const totalRows = 100000;
    let counter = 0;
    let lastLoggedPercentage = 0;

    return new Promise<void>((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
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
                sqlServer.query('INSERT IGNORE INTO people SET ?', mappedRow, (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        counter++;
                        const currentPercentage = Math.floor((counter / totalRows) * 100);
                        if (currentPercentage >= lastLoggedPercentage + 5) {
                            console.log(`Progress: ${currentPercentage}%`);
                            lastLoggedPercentage = currentPercentage;
                        }
                    }
                });
            })
            .on('end', () => {
                sqlServer.end((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            })
            .on('error', reject);
    });
}
export { parseCSV };