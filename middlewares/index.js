const login = require('./login');
const authMiddleware = require('./auth');

module.exports = {
  login,
  auth: authMiddleware,
};
