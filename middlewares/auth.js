const jwt = require('jsonwebtoken');
const { jwtConfig, secret } = require('./jwtConfiguration');

const generateJwt = (data) => {
  const token = jwt.sign({ data }, secret, jwtConfig);
  return { token };
};

module.exports = {
  generateJwt,
};
