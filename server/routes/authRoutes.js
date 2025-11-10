import express from 'express';
import { loginUser, registerUser, getMe } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/me', verifyToken, getMe);
router.post('/login', loginUser);
router.post('/register', registerUser);

export default router;