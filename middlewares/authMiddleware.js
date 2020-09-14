const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const userModel = require('../models/userModel');

const JWT_SECRET = 'shhhhhitsasecret!';

module.exports = rescue(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await userModel.getUserByEmail(payload.email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ message: 'jwt malformed' });
  }
});
