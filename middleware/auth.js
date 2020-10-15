require('dotenv/config');
const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');

module.exports = rescue(async (req, res, next) => {
  const token = req.headers.authorization.substr(7); // remove o bearer

  console.log(token);

  if (!token) return res.status(401).json({ error: 'Token invalido' });

  const segredo = process.env.SECRET_KEY || 2147483647;

  try {
    const data = jwt.verify(token, segredo);
    const { user } = data || {};

    if (!data || !user) return res.status(401).json({ error: 'Invalid token' });

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: 'Invalid token' });
  }
});
