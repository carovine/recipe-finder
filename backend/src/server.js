import express from 'express';
import dotenv from 'dotenv';
import { ENV } from './config/env.js';


dotenv.config();

const app = express();
const PORT = ENV.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Recipe Finder API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});