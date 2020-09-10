const jwt = require('jsonwebtoken');

function getToken(data) {
  return jwt.sign({ username: 'gabrei', password: 'lucas' }, 'gilgamesh');
}

module.exports = { getToken };
