const rescue = require('express-rescue');
const userService = require('../services/userService');

const addUser = rescue(async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await userService.add(name, email, password);

  if (newUser.status) {
    const { status, message } = newUser;
    return res.status(status).json({ message });
  }

  return res.status(201).json(newUser);
});

const loginUser = rescue(async (req, res) => {
  const { email, password } = req.body;

  const token = await userService.login(email, password);

  if (token.status) {
    const { status, message } = token;
    return res.status(status).json({ message });
  }

  res.status(200).json({ token });
});

module.exports = {
  addUser,
  loginUser,
};
