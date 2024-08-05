import express from "express"
const router = express.Router();
import backtestController from '../controllers/backtestController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import validationMiddleware from "../middlewares/validationMiddleware.js";

export default router.post('/', authMiddleware, validationMiddleware, backtestController);