import express from 'express';

const router = express.Router();

import characters from './characters.js';
router.use('/characters', characters);

export default router;