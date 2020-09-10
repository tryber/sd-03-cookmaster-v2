const jwt = require('jsonwebtoken');
const { jwtConfig, secret } = require('./jwtConfiguration');
const userModel = require('../models/userModel');

const generateJwt = (data) => {
  const token = jwt.sign({ data }, secret, jwtConfig);
  return { token };
};

const validateJWT = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ message: 'invalid token' });

  const {
    data: { _id: id },
  } = jwt.verify(token, secret);

  const user = await userModel.findUserById(id);

  if (!user) {
    return res.status(401).json({ message: 'invalid token' });
  }
  const { password, ...userData } = user;
  req.user = userData;

  return next();
};

module.exports = {
  generateJwt,
  validateJWT,
};
