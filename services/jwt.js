const jwt = require('jsonwebtoken');

function getToken(data) {
  return jwt.sign(data, 'gilgamesh');
}

function verifyToken(token) {
  return jwt.verify(token, 'gilgamesh');
}

module.exports = { getToken, verifyToken };
