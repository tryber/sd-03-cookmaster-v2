const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secret = 'cookmastersecret';

const auth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const { data: { _id } } = decoded;

    const user = await userModel.findById(_id);

    if (!user) {
      return res.status(401).json({ message: 'User does not exists.' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = auth;
