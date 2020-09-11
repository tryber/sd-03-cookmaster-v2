const jwt = require('jsonwebtoken');
const model = require('../users/modelUsers');

const SECRET = 'secret';

const userAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log('payy', req.headers);


  const payload = jwt.verify(token, SECRET);

  if (!token) return res.status(401).json({ message: 'no token brooo' });
  next();
};

module.exports = {
  userAuth,
};
