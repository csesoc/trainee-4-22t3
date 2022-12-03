import express from 'express';
import {
  addItem,
  deleteItem,
  updateItem,
  getItems,
} from '../controllers/itemController';

import { authenticateToken } from '../controllers/userController';

const router = express.Router();

router.post('/add', authenticateToken, addItem);
router.delete('/delete/:id', authenticateToken, deleteItem);
router.put('/update/:id', authenticateToken, updateItem);
router.get('/get/', authenticateToken, getItems);

export default router;
