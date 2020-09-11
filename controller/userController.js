const { Router } = require('express');
const rescue = require('express-rescue');

const users = Router();
const userService = require('../service/userService');

users.post(
  '/users',
  rescue(async (req, res, next) => {
    const payload = req.body;

    const user = await userService.newUser(payload);

    if (user.code) return next(user);

    //* Tudo certo devolver 201 com dados.
    return res.status(201).json(user);
  }),
);

module.exports = {
  users,
};
