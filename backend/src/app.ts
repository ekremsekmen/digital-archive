import express from 'express';
import violationsRoutes from './routes/violations.routes';
import caseRoutes from './routes/cases.routes'
import connectDB from './config/db';

const app = express();

connectDB();


app.use(express.json());

app.use('/violations', violationsRoutes);
app.use('/cases', caseRoutes);

export default app;