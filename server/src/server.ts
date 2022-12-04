import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import chalk from 'chalk';
import * as dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import itemRoutes from './routes/itemRoutes';
import { User } from './models/interfaces';

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

mongoose.connect(process.env.MONGO_URI as string).then(() => {
  console.log(chalk.cyan('Connected to MongoDB 🍃'));
  app.listen(port, () => {
    console.log(chalk.cyan(`Server listening at port ${port} 🚀`));
  });
});
