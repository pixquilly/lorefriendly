import mysql from 'mysql2';

const dbcon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '00990099',
    database: 'lorefriendly'
});

export default dbcon;

