import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const server = express();

server.use(cors());
server.use(json());

server.listen(process.env.PORT, () => console.log(`Servidor conectado na porta ${process.env.PORT}`));