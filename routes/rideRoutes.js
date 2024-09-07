import express from 'express';
import { createRide, cancelRide, changeRideStatus, getRides, RideDetails } from '../controllers/rideController.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', isAuth, createRide);
router.delete('/:rideId/cancel', isAuth, cancelRide);
router.patch('/status', isAuth, changeRideStatus);
router.get('/detail', RideDetails);
router.post('/allrides',getRides)

export default router;
