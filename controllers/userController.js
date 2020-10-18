const { Router } = require('express');
const rescue = require('express-rescue');
const authMiddleware = require('../middlewares/authMiddleware');
const userService = require('../services/userService');

const user = Router();

user.post('/users', rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const postUser = await userService.createUser(name, email, password);
  if (postUser.error) {
    return res.status(postUser.status).json({ message: postUser.message });
  }
  return res.status(201).json(postUser);
}));

user.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const login = await userService.login(email, password);
  if (login.error) {
    return res.status(login.status).json({ message: login.message });
  }
  return res.status(200).json(login);
});

user.post('/users/admin', authMiddleware, rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const { _id: userId } = req.user;
  const postUserAdmin = await userService.createUserAdmin(name, email, password, userId);
  if (postUserAdmin.error) {
    return res.status(postUserAdmin.status).json({ message: postUserAdmin.message });
  }
  return res.status(201).json(postUserAdmin);
}));

module.exports = user;
