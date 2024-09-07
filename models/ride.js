import mongoose from 'mongoose';
const { Schema } = mongoose;

const rideSchema = new Schema({
  dateTimeOfMakingRide: { type: Date, default: Date.now },
  dateTimeOfStartRide: { type: Date, required: true },
  ExpectedTravelTimeInSeconds: { type: Number, required: true },
  startPoint: [{ type: String, required: true }],
  endPoint: [{ type: String, required: true }],
  path: [],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  numberOfSeats: { type: Number, required: true },
  numberOfAvailableSeats: { type: Number, required: true },
  requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }],
  fare: [{type: Number, required: true }],
  status: { type: String, enum: ['created', 'started', 'ended', 'canceled'], default: 'created' },
  vehicleDetails: {
    type: { type: String, required: false },
    seater: { type: Number, required: false },
    model: { type: String, required: false }
  }
});

const Ride = mongoose.model('Ride', rideSchema);
export default Ride;
