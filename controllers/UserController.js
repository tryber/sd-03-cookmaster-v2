const { Router } = require('express');
const rescue = require('express-rescue');
const userService = require('../services/UserService');

const user = Router();

user.post(
  '/',
  rescue(async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req);
    const userCreated = await userService.createUserService(name, email, password);
    if (userCreated.code) {
      return res.status(400).json(userCreated);
    }
    return res.status(201).json(userCreated);
  }),
);

module.exports = user;
