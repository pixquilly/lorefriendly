import express from 'express';
import dbcon from './dbcon.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//import routes
import router from './routes/router.js';
app.use('/', router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the API' });
    dbcon.query('SELECT * FROM characters;', (error, results) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(results);
    });
});

app.post('/api/data', (req, res) => {
    const data = req.body;
    res.json({ received: data });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});