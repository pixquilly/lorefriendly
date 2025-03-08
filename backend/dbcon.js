import mysql from 'mysql2';

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '00990099',
    database: 'lorefriendly'
});

pool.query('SELECT * FROM characters;', (error, results) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log(results);
});

