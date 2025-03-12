import express from 'express';
import dbcon from '../dbcon.js';

const traits = express.Router();

traits.get('/all', (req, res) => {
    dbcon.query('SELECT * FROM traits;', (error, results) => {
        if (error) {
            console.error(error);
            return;
        }
        return res.json(results);
    });
});

traits.get('/id/:id', (req, res) => {
    const { id } = req.params;

    dbcon.query('SELECT * FROM traits WHERE id = ?;', [id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.json(results);   
    });
});

traits.get('/get/property', (req, res) => {
    const { fname, mname, lname, nicknames, titles, age, gender, race, bloodline, place_of_birth } = req.query;
    let query = 'SELECT * FROM traits WHERE 1=1';
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
            return res.status(404).json({ message: 'No traits match search.' });
        }
        return res.json(result);
    });
});
traits.post('/insert', (req, res) => {
    const { fname, mname, lname, nicknames, titles, age, gender, race, bloodline, place_of_birth } = req.body;
    const query = "INSERT INTO lorefriendly.`traits` (id, fname, mname, lname, nicknames, titles, age, gender, race, bloodline, place_of_birth) VALUES (0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    const values = [fname, mname, lname, nicknames, titles, age, gender, race, bloodline, place_of_birth];

    dbcon.query(query, values, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(201).json(results);
    });
});

traits.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { fname, mname, lname, nicknames, titles, age, gender, race, bloodline, place_of_birth } = req.body;
    const query = "UPDATE lorefriendly.`traits` SET fname = ?, mname = ?, lname = ?, nicknames = ?, titles = ?, age = ?, gender = ?, race = ?, bloodline = ?, place_of_birth = ? WHERE id = ?;";
    const values = [fname, mname, lname, nicknames, titles, age, gender, race, bloodline, place_of_birth, id];

    dbcon.query(query, values, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(200).json(results);
    });
});

traits.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM lorefriendly.`traits` WHERE id = ?;";

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

export default traits;

