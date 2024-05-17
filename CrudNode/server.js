import express from 'express';
const app = express();

import cors from 'cors';
app.use(cors());

const port = process.env.PORT

app.use(express.json());

import connectDB from './database.js';
connectDB();

import userRoutes from './src/routes/userRoutes.js';
app.use('/user', userRoutes);

import carRoutes from './src/routes/carRoutes.js';
app.use('/car', carRoutes);

import taskRoutes from './src/routes/taskRoutes.js';
app.use('/task', taskRoutes);

import noteRoutes from './src/routes/noteRoutes.js';
app.use('/note', noteRoutes);

app.listen(port, () => {
    console.log(`link: http://localhost:${port}/`);
})

