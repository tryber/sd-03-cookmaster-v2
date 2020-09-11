const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const JWT_SECRET = require('../services/JWT');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await userModel.getUserByEmail(payload.email);
    if (!user) {
      return res.status(401).json({ message: 'user not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};
