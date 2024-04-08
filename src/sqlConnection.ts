import mysql from 'mysql';

const sqlServer = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'Admin@123',
    database: 'People',
});

const createTable = () => {
    return new Promise((resolve, reject) => {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS people (
                \`Index\` INT PRIMARY KEY,
                \`User_Id\` VARCHAR(255),
                \`First_Name\` VARCHAR(255),
                \`Last_Name\` VARCHAR(255),
                \`Sex\` VARCHAR(255),
                \`Email\` VARCHAR(255),
                \`Phone\` VARCHAR(255),
                \`Date_of_birth\` DATE,
                \`Job_Title\` VARCHAR(255)
            );
        `;

        sqlServer.query(createTableQuery, (error: mysql.MysqlError | null) => {
            if (error) {
                reject(error);
            } else {
                resolve(null);
            }
        });
    });
};

export { sqlServer, createTable };

export default sqlServer;