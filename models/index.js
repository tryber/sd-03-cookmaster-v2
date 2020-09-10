const user = require('./userModels');

module.exports = {
  createUser: user.createUser,
  userByEmail: user.findUserByEmail,
};
