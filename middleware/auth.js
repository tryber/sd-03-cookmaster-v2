require('dotenv/config');
const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');

module.exports = rescue(async (req, res, next) => {
  const token = `${req.headers.authorization}`; // remover o substr quando enviar!! .substr(7)

  // console.log(token);

  if (!token) return res.status(401).json({ error: 'jwt malformed' });

  const { SECRET_KEY } = process.env;

  try {
    const data = jwt.verify(token, SECRET_KEY);
    const { user } = data || {};

    if (!data || !user) return res.status(401).json({ error: 'invalid token' });

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: 'invalid token' });
  }
});
