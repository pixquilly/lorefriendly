import express from 'express';
import dbcon from '../dbcon.js';
import dotenv from 'dotenv';
dotenv.config();

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

characters.get('/id/:id', (req, res) => {
    const { id } = req.params;

    dbcon.query('SELECT * FROM characters WHERE id = ?;', [id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.json(results);   
    });
});

characters.get('/get/property', (req, res) => {
    const { fname, mname, lname, nicknames, titles, age, gender, race, bloodline, place_of_birth } = req.query;
    let query = 'SELECT * FROM characters WHERE 1=1';
    const values = [];

    if (fname) {
        query += ' AND fname = ?';
        values.push(fname);
    }
    if (mname) {
        query += ' AND mname = ?';
        values.push(mname);
    }
    if (lname) {
        query += ' AND lname = ?';
        values.push(lname);
    }
    if (nicknames) {
        query += ' AND nicknames = ?';
        values.push(nicknames);
    }
    if (titles) {
        query += ' AND titles = ?';
        values.push(titles);
    }
    if (age) {
        query += ' AND age = ?';
        values.push(age);
    }
    if (gender) {
        query += ' AND gender = ?';
        values.push(gender);
    }
    if (race) {
        query += ' AND race = ?';
        values.push(race);
    }
    if (bloodline) {
        query += ' AND bloodline = ?';
        values.push(bloodline);
    }
    if (place_of_birth) {
        query += ' AND place_of_birth = ?';
        values.push(place_of_birth);
    }

    dbcon.query(query, values, (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Database query error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No characters match search.' });
        }
        return res.json(result);
    });
});
characters.post('/insert', (req, res) => {
    const { fname, mname, lname, nicknames, titles, age, gender, race, bloodline, place_of_birth, traits} = req.body;
    const query = "INSERT INTO lorefriendly.`characters` (id, fname, mname, lname, nicknames, titles, age, gender, race, bloodline, place_of_birth) VALUES (0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    const values = [fname, mname, lname, JSON.stringify(nicknames), JSON.stringify(titles), age, gender, race, bloodline, place_of_birth];

    dbcon.query(query, values, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(201).json(results);
    });
    fetch('http://localhost:3000/traits/all')
    .then((response)=>response.json())
    .then((data)=>{
        console.log("result", data);
    });

});

characters.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { fname, mname, lname, nicknames, titles, age, gender, race, bloodline, place_of_birth } = req.body;
    const query = "UPDATE lorefriendly.`characters` SET fname = ?, mname = ?, lname = ?, nicknames = ?, titles = ?, age = ?, gender = ?, race = ?, bloodline = ?, place_of_birth = ? WHERE id = ?;";
    const values = [fname, mname, lname, nicknames, titles, age, gender, race, bloodline, place_of_birth, id];

    dbcon.query(query, values, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(200).json(results);
    });
});

characters.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM lorefriendly.`characters` WHERE id = ?;";

    dbcon.query(query, [id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Database query error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Character does not exist' });
        }
        return res.status(200).json({ message: 'Character deleted successfully' });
    });
});

export default characters;

