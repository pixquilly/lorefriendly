import express from 'express';

const router = express.Router();

import characters from './characters.js';
import traits from './traits.js';

router.use('/characters', characters);
router.use('/traits', traits);

export default router;