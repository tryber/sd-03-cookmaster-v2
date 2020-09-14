const jwt = require('jsonwebtoken');
const model = require('../users/modelUsers');

const SECRET = 'secret';

const userAuth = async (req, res, next) => {
  const { authorization: token } = req.headers || {};
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  const payload = jwt.verify(token, SECRET);
  const { emailPayload } = payload;

  const user = await model.checkEmail(emailPayload);
  console.log(user)
  
  if (emailPayload) {
    res.status(201).json({ message: 'jwt' });
    return next();
  }
  req.user = user;

  res.status(401).json({ message: 'jwt malformed' });
  return next();
};

module.exports = {
  userAuth,
};
