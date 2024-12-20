import express from 'express';
import violationsRoutes from './routes/violations.routes';
import connectDB from './config/db';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the violations routes
app.use('/violations', violationsRoutes);

export default app;