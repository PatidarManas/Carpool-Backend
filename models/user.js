import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  activeRides: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ride' }],
  pastRides: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ride' }],
  walletBalance: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  ratingArray: [Number],
  notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }]
});

const User = mongoose.model('User', userSchema);
export default User;
