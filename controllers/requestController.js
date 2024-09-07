import Request from '../models/Request.js';
import Ride from '../models/ride.js';
import Notification from '../models/Notification.js';
import { sendEmail } from '../utils/emailService.js';

export const createRequest = async (req, res) => {
  try {
    const { rideId, ...requestData } = req.body;
    console.log(rideId)
    const request = new Request({ ...requestData, createdBy: req.user._id, rideId});
    await request.save();

    const ride = await Ride.findById(rideId);
    ride.requests.push(request._id);
    await ride.save();

    // Notify ride creator
    const notification = new Notification({
      userId: ride.createdBy,
      message: `New request for your ride from ${req.user.name}`
    });
    await notification.save();

    // Send email
    sendEmail(ride.createdBy.email, 'New Ride Request', `You have a new request from ${req.user.name}`);

    res.status(201).json({ message: 'Request created successfully', request });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await Request.findByIdAndUpdate(requestId, { requestStatus: 'accepted' }, { new: true });

    // Notify requester
    const notification = new Notification({
      user: request.createdBy,
      message: `Your request has been accepted`
    });
    await notification.save();

    // Send email
    sendEmail(request.createdBy.email, 'Request Accepted', 'Your ride request has been accepted');

    res.status(200).json({ message: 'Request accepted', request });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const denyRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await Request.findByIdAndUpdate(requestId, { requestStatus: 'denied' }, { new: true });

    // Notify requester
    const notification = new Notification({
      user: request.createdBy,
      message: `Your request has been denied`
    });
    await notification.save();

    // Send email
    sendEmail(request.createdBy.email, 'Request Denied', 'Your ride request has been denied');

    res.status(200).json({ message: 'Request denied', request });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
