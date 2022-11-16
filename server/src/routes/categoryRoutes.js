import express from 'express';
import {
  addCategory,
  deleteCategory,
  updateCategory,
  getCategory,
} from '../controllers/categoryController.js';

const router = express.Router();

router.post('/add', addCategory);
router.delete('/delete/:id', deleteCategory);
router.put('/update/:id', updateCategory);
router.get('/get/:id', getCategory);

export default router;
