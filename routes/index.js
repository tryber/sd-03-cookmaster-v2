const userRoutes = require('./usersRoutes');

module.exports = {
  newUser: userRoutes.createUser,
  login: userRoutes.userLogin,
};
