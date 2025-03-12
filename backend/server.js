import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//import routes
import router from './routes/router.js';
app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
app.use("/", (req, res, next) => {
    console.log(`Endpoint ${req.method} ${req.url} was hit`);
    next();
});