import mongoose from 'mongoose';
const { Schema } = mongoose;

const requestSchema = new Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
  boardingPoint: [{ type: Number, required: true }],
  dropPoint: [{ type: Number, required: true }],
  numberOfPassengers: { type: Number, required: true },
  // passengerDetails: [{
  //   name: { type: String, required: true },
  //   gender: { type: String, required: true },
  //   age: { type: Number, required: true }
  // }],
  requestStatus: { type: String, enum: ['pending', 'accepted', 'denied'], default: 'pending' },
  contactInfo: { type: String },
  requestMessage: { type: String }
});

const Request = mongoose.model('Request', requestSchema);
export default Request;
