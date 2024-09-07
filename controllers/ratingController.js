import Rating from '../models/Rating.js';

export const rateRide = async (req, res) => {
  try {
    const rating = new Rating({ ...req.body, givenBy: req.user._id });
    await rating.save();
    res.status(201).json({ message: 'Rating submitted successfully', rating });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
