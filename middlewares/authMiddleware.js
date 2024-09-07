import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const isAuth = async (req, res, next) => {
  console.log(req.header('Authorization'))
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).send({ error: 'Authorization header is missing.' });
  }
  const token = req.header('Authorization').replace('Bearer ', '');
  console.log(token)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await User.findOne({ _id: decoded.id });
    
    if (!user) {
      throw new Error();
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};
