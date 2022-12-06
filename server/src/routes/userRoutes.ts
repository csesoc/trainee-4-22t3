import express from 'express';
import { registerUser, loginUser, searchUsers } from '../controllers/userController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/search', searchUsers);

export default router;
