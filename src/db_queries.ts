import { sqlServer } from './sqlConnection';

//Over 18, under 21
const query1 = `
    SELECT COUNT(*) as count FROM people WHERE Date_of_birth < DATE_SUB(CURDATE(), INTERVAL 18 YEAR) AND Date_of_birth > DATE_SUB(CURDATE(), INTERVAL 21 YEAR);
`;

//Most frequent first name
const query2 = `
    SELECT First_Name, COUNT(First_Name) AS count FROM people GROUP BY First_Name ORDER BY count DESC LIMIT 1;
`;

const queryPromise1 = new Promise<void>((resolve, reject) => {
    sqlServer.query(query1, (error, results) => {
        if (error) {
            console.error('An error occurred:', error);
            reject(error);
        } else {
            console.log(`There are ${results[0].count} people over 18 and under 21.`);
            resolve();
        }
    });
});

const queryPromise2 = new Promise<void>((resolve, reject) => {
    sqlServer.query(query2, (error, results) => {
        if (error) {
            console.error('An error occurred:', error);
            reject(error);
        } else {
            console.log(`The most frequent first name is: ${results[0].First_Name}`);
            resolve();
        }
    });
});

Promise.all([queryPromise1, queryPromise2])
    .then(() => sqlServer.end())
    .catch((error) => console.error('An error occurred:', error));