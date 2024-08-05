import express from "express"

import userRoutes from "./users.js"
import backtestRoutes from "./backtest.js"

const router = express.Router();

router.use("/user", userRoutes);
router.use("/backtest", backtestRoutes);

export default router;