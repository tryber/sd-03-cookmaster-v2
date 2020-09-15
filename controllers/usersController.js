const userService = require('../services/users');

const setNewUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await userService.setNewUser(name, email, password);
  if (user.error) return next(user);
  res.status(201).json(user);
};

const findUser = async (req, res, next) => {
  const { email, password } = req.body;
  const token = await userService.findUser(email, password);
  if (token.error) return next(token);
  res.status(200).json({ token });
};

const setNewAdmin = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await userService.setNewAdmin(name, email, password);
  if (user.error) return next(user);
  res.status(201).json(user);
};

module.exports = {
  setNewUser,
  findUser,
  setNewAdmin,
};
