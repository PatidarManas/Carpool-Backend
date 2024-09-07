import express from 'express';
import { createRequest, acceptRequest, denyRequest } from '../controllers/requestController.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', isAuth, createRequest);
router.patch('/:requestId/accept', isAuth, acceptRequest);
router.patch('/:requestId/deny', isAuth, denyRequest);

export default router;
