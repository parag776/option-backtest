// src/routes/index.js

import { Router } from 'express';
import backtestRoutes from './backtestRoutes.js';

const router = Router();

// Example route
router.get('/', (req, res) => {
    res.send('Hello, world!');
});

router.use('/backtest', backtestRoutes)

export default router;
