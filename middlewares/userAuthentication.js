const jwt = require('jsonwebtoken');
const model = require('../users/modelUsers');

const SECRET = 'secret';

const userAuth = async (req, res, next) => {
  const { authorization: token } = req.headers || {};

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const payload = jwt.verify(token, SECRET);
    const { emailPayload } = payload;

    const user = await model.checkEmail(emailPayload);

    if (!user) {
      res.status(401).json({ message: 'user not found' });
      return next();
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  userAuth,
};
