const userService = require('../services/users');

const setNewUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await userService.setNewUser(name, email, password);
  if (user.error) return next(user);
  res.status(201).json(user);
};

module.exports = {
  setNewUser,
};
