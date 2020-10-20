const { Router } = require('express');
const rescue = require('express-rescue');
const { userService } = require('../services');
const { validateJWT } = require('../middlewares/auth');

const users = Router();

users.post(
  '/',
  rescue(async (req, res) => {
    const { name, email, password } = req.body;

    const registeredUser = await userService.registerUser(name, email, password);

    if (registeredUser.message && registeredUser.code === 'conflict') {
      return res.status(409).json({ message: registeredUser.message });
    }

    if (registeredUser.message) {
      return res.status(400).json({ message: registeredUser.message });
    }

    return res.status(201).json(registeredUser);
  }),
);

users.post(
  '/admin',
  validateJWT,
  rescue(async (req, res) => {
    const { name, email, password } = req.body;
    const { user } = req;

    const registeredAdmin = await userService.registerAdmin(name, email, password, user);

    if (registeredAdmin.message) {
      return res.status(403).json(registeredAdmin);
    }

    return res.status(201).json(registeredAdmin);
  }),
);

module.exports = users;
