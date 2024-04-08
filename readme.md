### Database challenge for Driven

This repo houses Typescript files and the sample db for this coding challenge. 

To get started, ensure you have node installed on your device, clone the repo and navigate to the repository folder with your local CLI. 

*Please note these instructions may change slightly depending on your system os, this was tested on ubuntu.*

## Input the following commands into your CLI

# Install repo packages

`npm i`

# Install dev package for runnning ts without having to compile

`npm i --save-dev ts-node typescript`


## Database setup

This project was created with a MySQL database in mind. 

Install the correct MySQL and optionally MySQL workbench version for your OS

https://dev.mysql.com/downloads/

Create a schema in the database called "People" as well as a user with the following information:

username: admin
password: Admin@123

Depending on your version of MySQL, you may need to run the following command in your SQL as some versions use an unsupported security format.

`ALTER USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Admin@123';`


# Information about the schema: 

For this challenge I created only a single table called people. It uses the index number as the primary key, the user's ID can be used as a foreign key to reference a specific person in another table. Name, sex, email, phone and job title fields are all generic varchar fields, and date of birth is a date field. 

## Running the scripts

Now that you have your database properly configured, simply execute the following commands in a terminal at the root directory of the repo. 

`ts-node src/run.ts` 

This command will connect to the database, check if the required tables already exist or not, create them if not, parse the csv data by iterating through each row, storing the data in an SQL formatted map, and execute the SQL queries to inject the data into the database. Progress will be tracked in your terminal giving percentages at 5% intervals. Currently a static variable is used to track progress but this could be determined dynamically by simply couting the total number of rows and using that number, however for this challenge the number of rows was static. 

*Please note this may take up to 5 minutes depending on your system configuration as there are 100000 entries*

Finally you can execute the following command in your terminal to get the answer for the bonus questions, how many users over 18 but under 21, as well as the most common name. Both will be printed to console. 

`tsnode src/db_queries.ts`

## Final considerations and comments

For this project I wanted to make everything as modular as possible so that any of these could be used as a framework to create other csv parsers in the case of the parser, as well as the MySQL database connection. The modularity also allows them to be relatively plug and play with almost any node application that leverages a MySQL database. The parser was relatively simple to make, only issues I ran into were due to my unfamiliarity with Typescript but those were quickly overcame with some light googling and reading the TS documentation, as well as some docs for the MySQL and csv-parser packages. 

Finally if you would like to test the application again, simply drop the table follow the steps in Running the scripts once again. 

`USE People;`
`DROP TABLE IF EXISTS people;`