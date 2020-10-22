const jwt = require('jsonwebtoken');
require('dotenv/config');
const rescue = require('express-rescue');

const { SECRET_KEY = '6437658488' } = process.env;

module.exports = rescue(async (req, res, next) => {
  const { authorization: token } = req.headers || {};

  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const data = jwt.verify(token, SECRET_KEY);
    const { user } = data || {};

    if (!data || !user) return res.status(401).json({ message: 'Invalid token' });

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ message: 'jwt malformed' });
  }
});
