const jwt = require('jsonwebtoken');

const validateToken = (token) => jwt.verify(token, 'htop');

const getToken = (data) => jwt.sign(data, 'htop');

module.exports = { validateToken, getToken };
