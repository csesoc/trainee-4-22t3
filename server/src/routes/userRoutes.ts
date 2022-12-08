import express from 'express';
import { registerUser, loginUser, searchUsers, updateUser, detailsUser } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/search', searchUsers);
router.put('/update', authenticateToken, updateUser);
router.get('/get', authenticateToken, detailsUser)

export default router;
