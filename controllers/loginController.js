require('dotenv/config');
const { Router } = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const services = require('../services');

const login = Router();

const segredo = process.env.SECRET_KEY || 2147483647;

const configToken = {
  expiresIn: '8d',
  algorithm: 'HS256',
};

login.route('/').post(rescue(async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.status(401).json({ message: 'Preencha os campos' });
  }

  const user = await services.checkLogin(req.body.email, req.body.password);

  if (user.error) return res.status(401);
  req.user = user;
  next();
}),
rescue(async (req, res) => {
  const token = jwt.sign({ user: req.user }, segredo, configToken);
  res.status(200).json({ token });
}));

module.exports = login;
