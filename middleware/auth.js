require('dotenv/config');
const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');

module.exports = rescue(async (req, res, next) => {
  const token = req.headers.authorization.substr(7); // remove o bearer

  console.log(token);

  if (!token) return res.status(401).json({ error: 'jwt malformed' });

  const { SECRET_KEY = '2147483647' } = process.env;

  try {
    const data = jwt.verify(token, SECRET_KEY);
    const { user } = data || {};

    if (!data || !user) return res.status(401).json({ error: 'Invalid token' });

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: 'Invalid token' });
  }
});
