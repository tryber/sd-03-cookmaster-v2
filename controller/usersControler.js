const jwt = require('jsonwebtoken')
const rescue = require('express-rescue');
// Necessário para que a request seja respondida

const getById = rescue(async (req, res) => {
  const user = await userService.getById(req.params.id);
  console.log(user);
  if (user) return res.status(200).json(user);
  return res.status(422).json({ mer: "da"});
});

const userService = require('../service/userService');

require('dotenv/config');

const { USER_KEY } = process.env;
const jwtconfig = {
  expiresIn: '1d',
  algorithm: 'HS256' // SHA-256
}

const insertUser = rescue(async (req, res) => {
  const user = await userService.checkUserData(req.body);
  if (user.message) return res.status(user.code).json({ message: user.message });
  return res.status(201).json(user);
});

const selectUser = rescue(async (req, res) => {
  const { code, message, user } = await userService.selectOne(req.body);
  let token = '';
  // Só vai rolar se o usuário e senha coresponderem a algum no banco
  if (user) token = jwt.sign({ data: user[0]._id }, USER_KEY, jwtconfig);

  return message ?
  res.status(code).json({ message }) :
  res.status(code).json({ token });
});

module.exports = {
  insertUser,
  selectUser,
  getById,
};
