import express from 'express';
const router = express.Router();
import {
  addCategory,
  deleteCategory,
  updateCategory,
  getCategory,
} from '../controllers/categoryController.js';

router.post('/add', addCategory);
router.delete('/delete/:id', deleteCategory);
router.put('/update/:id', updateCategory);
router.get('/get/:id', getCategory);

export default router;
