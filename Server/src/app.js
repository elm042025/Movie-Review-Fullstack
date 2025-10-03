import express from 'express';
import dotenv from 'dotenv';

//! ===== routes =====  

import moviesRoutes from './routes/moviesRoutes.js';


dotenv.config();

const app = express()

// ===== middlewares =====

app.use(express.json())


// ===== movies & movies reviews routes =====

app.use('/movies', moviesRoutes)

// ===== 404 handler =====

app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

export default app;