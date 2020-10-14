const { Router } = require('express');
const rescue = require('express-rescue');
const userService = require('../services/userServices');

const user = Router();

user.post('/users', rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const postUser = await userService.createUser(name, email, password);
  if (postUser.error) {
    return res.status(postUser.status).json({ message: postUser.message });
  }
  return res.status(201).json(postUser);
}));

module.exports = user;
