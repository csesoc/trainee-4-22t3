import express from 'express';
const router = express.Router();
import {
  addCategory,
  deleteCategory,
  updateCategory,
  getCategoryInfo,
} from '../controllers/categoryController';

router.post('/add', addCategory);
router.delete('/delete/:id', deleteCategory);
router.put('/update/:id', updateCategory);
router.get('/get/:id', getCategoryInfo);

export default router;
