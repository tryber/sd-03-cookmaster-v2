const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
// Necessário para que a request seja respondida

require('dotenv/config');

const userService = require('../service/userService');

const USER_KEY =  'agendadoida';
const jwtconfig = {
  expiresIn: '1d',
  algorithm: 'HS256', // SHA-256
};

const insertUser = rescue(async (req, res) => {
  const user = await userService.checkAndInsert(req.body, 'user', 'user');

  return user.message ?
  res.status(user.code).json({ message: user.message }) :
  res.status(201).json(user);
});

const insertAdmin = rescue(async (req, res) => {
  const user = await userService.checkAndInsert(req.body, req.user.role, 'admin');

  return user.message ?
  res.status(user.code).json({ message: user.message }) :
  res.status(201).json(user);
});

const selectUser = rescue(async (req, res) => {
  const { code, message, user } = await userService.selectOne(req.body);
  let token = '';
  // Só vai rolar se o usuário e senha coresponderem a algum no banco
  if (user) token = jwt.sign({ data: user._id }, USER_KEY, jwtconfig);

  return message ?
  res.status(code).json({ message }) :
  res.status(code).json({ token });
});

module.exports = {
  insertUser,
  insertAdmin,
  selectUser,
};
