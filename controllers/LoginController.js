const { Router } = require('express');
const rescue = require('express-rescue');
const { userService } = require('../services');
const { validateJWT } = require('../middlewares/validation');

const users = Router();

const login = rescue(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.login(email, password);
  if (user.message) {
    return res.status(401).json(user);
  }
  return res.status(200).json(user);
});

users.post(
  '/',
  rescue(async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = await userService.registerUser(name, email, password);
    if (newUser.message && newUser.code === 'conflict') {
      return res.status(409).json({ message: newUser.message });
    }
    if (newUser.message) {
      return res.status(400).json({ message: newUser.message });
    }
    return res.status(201).json(newUser);
  }),
  );

users.post(
  '/admin',
  validateJWT,
  rescue(async (req, res) => {
    const { name, email, password } = req.body;
    const { user } = req;
    const newAdmin = await userService.registerAdmin(name, email, password, user);
    if (newAdmin.message) {
      return res.status(403).json(newAdmin);
    }
    return res.status(201).json(newAdmin);
  }),
);

module.exports = {
  login,
  users,
};
