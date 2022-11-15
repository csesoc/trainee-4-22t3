import express, { response } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import mongoose from 'mongoose';

const mongoURI = 'REDACTED';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/categories', categoryRoutes);

mongoose.connect(mongoURI).then(() => {
  app.listen(port, () => {
    console.log(`Server listening at port ${port} 🚀`);
  });
});
