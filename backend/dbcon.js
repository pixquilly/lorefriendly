import mysql from 'mysql2';

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '00990099',
    database: 'lorefriendly'
});

const result = pool.query('SELECT * FROM characters');
console.log(result[0]);

