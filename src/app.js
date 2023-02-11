import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { gamesRouter } from './routes/gamesRouter.js';
import { customersRouter } from './routes/customersRouter.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use(gamesRouter);
app.use(customersRouter);

app.listen(process.env.PORT || 5001, () => console.log(`Servidor conectado na porta ${process.env.PORT}`));