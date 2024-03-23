require('dotenv').config();
const mysql = require('mysql2');
// Establishes SQL connection using environment variables
const sqlConnection = mysql.createConnection({
    host: 'localhost',
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});
// Connects to the database and logs a message indicating success or failure
sqlConnection.connect((err) => {
    if(err) {
        console.log('Unable to connect');
    } else {
        console.log('Connection successful');
    }
});

module.exports = sqlConnection;