import express from 'express';
const router = express.Router();
import {
  addItem,
  deleteItem,
  updateItem,
  getItem,
} from '../controllers/itemController.js';

router.post('/add', addItem);
router.delete('/delete/:id', deleteItem);
router.put('/update/:id', updateItem);
router.get('/get/:id', getItem);

export default router;
