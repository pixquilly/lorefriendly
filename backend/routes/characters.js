import express from 'express';
import dbcon from '../dbcon.js';

const characters = express.Router();

characters.get('/all', (req, res) => {
    dbcon.query('SELECT * FROM characters;', (error, results) => {
        if (error) {
            console.error(error);
            return;
        }
        return res.json(results);
    });
});

export default characters;