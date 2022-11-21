import express from 'express';
import {
  addItem,
  deleteItem,
  updateItem,
  getItem,
} from '../controllers/itemController';

const router = express.Router();

router.post('/add', addItem);
router.delete('/delete/:id', deleteItem);
router.put('/update/:id', updateItem);
router.get('/get/:id', getItem);

export default router;
