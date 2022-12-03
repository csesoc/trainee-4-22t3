import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import { User } from './models/interfaces';
import itemRoutes from './routes/itemRoutes';
import categoryRoutes from './routes/categoryRoutes';
import mongoose from 'mongoose';
import chalk from 'chalk';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/categories', categoryRoutes);

mongoose.connect(process.env.MONGO_URI as string).then(() => {
  console.log(chalk.cyan('Connected to MongoDB 🍃'));
  app.listen(port, () => {
    console.log(chalk.cyan(`Server listening at port ${port} 🚀`));
  });
});
