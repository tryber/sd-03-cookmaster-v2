const rescue = require('express-rescue');

const userService = require('../service/userService');
const loginService = require('../service/loginService');


const newUser = rescue(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await userService.newUser(name, email, password);

  if (user.code) return next(user);

  //* Tudo certo devolver 201 com dados.
  return res.status(201).json(user);
});

const login = rescue(async (req, res, next) => {
  const { email, password } = req.body;

  const token = await loginService.login(email, password);

  if (token.code) return next(token);

  //* Tudo certo devolver 200 com dados.
  return res.status(200).json(token);
});

module.exports = {
  login,
  newUser,
};
