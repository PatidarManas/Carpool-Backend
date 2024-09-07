import mongoose from 'mongoose';
const { Schema } = mongoose;

const ratingSchema = new Schema({
  givenBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  givenTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
  vehicleRating: { type: Number, required: true, min: 0, max: 5 },
  riderRating: { type: Number, required: true, min: 0, max: 5 },
  safeRideRating: { type: Number, required: true, min: 0, max: 5 },
  riderCommunicationRating: { type: Number, required: true, min: 0, max: 5 },
  riderFollowingRulesRating: { type: Number, required: true, min: 0, max: 5 },
  comment: { type: String }
});

const Rating = mongoose.model('Rating', ratingSchema);
export default Rating;
