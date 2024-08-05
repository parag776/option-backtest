// src/app.js

import express from 'express';
import morgan from 'morgan';
import routes from './routes/index.js'; // Assuming you have a routes directory
import cors from "cors";
import { errorHandler } from './middlewares/errorMiddleware.js';

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Logs requests to the console

// Routes
app.use('/api', routes);

//error Middleware
app.use(errorHandler)

export default app; 