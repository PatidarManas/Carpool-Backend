import express from 'express';
import { rateRide } from '../controllers/ratingController.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/rate', isAuth, rateRide);

export default router;
