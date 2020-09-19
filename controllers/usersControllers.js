const { Router } = require('express');
const rescue = require('express-rescue');

const usersService = require('../service/usersService');

const users = Router();

const validateJWT = require('../middlewares/auth');

users.post('/', rescue(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await usersService.createUsers(name, email, password);

  if (user.error) {
    return res.status(user.cod).json({
      message: user.message,
    });
  }

  return res.status(201).json(user);
}));

users.post('/admin', validateJWT, rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const { role } = req.user;

  const user = await usersService.createAdmin(name, email, password, role);

  if (user.error) {
    return res.status(user.cod).json({
      message: user.message,
    });
  }

  return res.status(201).json(user);
}));

module.exports = users;
