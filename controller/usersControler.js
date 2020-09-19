const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
// Necessário para que a request seja respondida

require('dotenv/config');

const userService = require('../service/userService');

const USER_KEY = 'agendadoida';
const jwtconfig = {
  expiresIn: '1d',
  algorithm: 'HS256', // SHA-256
};

// Função criada para resolver duplicidade de código das próximas 2 funções
const newUserFeedback = (user, resp) => {
  if (user.message) { return resp.status(user.code).json({ message: user.message }) };
  return resp.status(201).json(user);
};

const insertUser = rescue(async (req, res) => {
  const user = await userService.checkAndInsert(req.body, 'user', 'user');
  newUserFeedback(user, res);
});

const insertAdmin = rescue(async (req, res) => {
  const user = await userService.checkAndInsert(req.body, req.user.role, 'admin');
  newUserFeedback(user, res);
});

const selectUser = rescue(async (req, res) => {
  const { code, message, user } = await userService.selectOne(req.body);

  let token = '';
  // Só vai puxar se o usuário e senha coresponderem a algum no banco
  if (user) {
    const { _id: uId } = user;
    token = jwt.sign({ data: uId }, USER_KEY, jwtconfig);
  }

  return message ?
  res.status(code).json({ message }) :
  res.status(code).json({ token });
});

module.exports = {
  insertUser,
  insertAdmin,
  selectUser,
};
