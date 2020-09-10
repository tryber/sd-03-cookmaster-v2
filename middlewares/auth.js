const jwt = require('jsonwebtoken');
const { jwtConfig, secret } = require('./jwtConfiguration');
const userModel = require('../models/userModel');

const generateJwt = (data) => {
  const token = jwt.sign({ data }, secret, jwtConfig);
  return { token };
};

const validateJWT = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) req.user = { code: 'invalid_token', message: 'invalid token' };
  try {
    const decoded = jwt.verify(token, secret);
    const user = await userModel.findById(decoded.data._id);
    if (!user) req.user = { code: 'invalid_token', message: 'invalid token' };
    else {
      const { password, ...userData } = user;
      req.user = userData;
    }
    return next();
  } catch (err) {
    console.log(err);
    return (req.user = { code: 'invalid_token', message: 'invalid token' });
  }
};

module.exports = {
  generateJwt,
  validateJWT,
};
