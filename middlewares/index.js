const { authMiddleware } = require('./auth');
const { authAdminMiddleware } = require('./authAdmin');

module.exports = {
  auth: authMiddleware,
  authAdmin: authAdminMiddleware,
};
