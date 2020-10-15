const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = 'mirellasproject';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'invalid token' });

  const payload = jwt.verify(token, JWT_SECRET);
  const user = await userModel.getUserByEmail({ email: payload.email });
  if (!user) return res.status(401).json({ message: 'user not found' });

  req.user = user;
  next();
};
