import express from 'express';
import { getNotifications, markAsRead } from '../controllers/notificationController.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', isAuth, getNotifications);
router.patch('/:notificationId/read', isAuth, markAsRead);

export default router;
