import express from 'express';
import { createUser, loginUser, isLoggedIn } from '../controllers/authController.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/isloggedin',isAuth, isLoggedIn);

export default router;
