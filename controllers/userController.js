const { Router } = require('express');
const rescue = require('express-rescue');
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

user.post('/login', rescue(async (req, res) => {
  const { email, password } = req.body;
  const login = await userService.login(email, password);
  if (login.error) {
    return res.status(login.status).json({ message: login.message });
  }
  return res.status(200).json(login);
}));

module.exports = user;
