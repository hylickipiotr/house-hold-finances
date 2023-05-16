import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getPort } from './utils/env';

dotenv.config();

const app = express();

app.use(cors());

app.listen(getPort(), () => {
  console.log(`Server started at http://localhost:${getPort()}`);
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});
