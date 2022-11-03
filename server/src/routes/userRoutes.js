import express from 'express';
const router = express.Router();
import { registerUser, loginUser } from '../controllers/userController';

router.post('/register', registerUser);
router.post('/login', loginUser);

app.post('/user/register', (req, res) => {
  const { email, username, password } = req.body;
});

export default router;
