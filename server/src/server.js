import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import mongoose from 'mongoose';
import chalk from 'chalk';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/categories', categoryRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log(chalk.cyan('Connected to MongoDB 🍃'));
  app.listen(port, () => {
    console.log(chalk.cyan(`Server listening at port ${port} 🚀`));
  });
});
