const jwt = require('jsonwebtoken');
const model = require('../users/modelUsers');

const SECRET = 'secret';

const userAuth = async (req, res, next) => {
  const { authorization: token } = req.headers || {};
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  const payload = jwt.verify(token, SECRET);
  const { user: data } = payload || {};

  const user = await model.checkEmail(data.emailPayload);
  console.log('teste', user);

  if (!user) {
    return res.status(401).json({ message: 'jwt malformed' });
  }

  req.user = user;

  // return res.status(401).json({ message: 'jwt malformed' });
  next();
};

module.exports = {
  userAuth,
};
