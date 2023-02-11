import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { gamesRouter } from './routes/gamesRouter.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use(gamesRouter);

app.listen(process.env.PORT, () => console.log(`Servidor conectado na porta ${process.env.PORT}`));