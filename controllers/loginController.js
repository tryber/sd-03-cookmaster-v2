require('dotenv/config');
const { Router } = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const services = require('../services');
const models = require('../models');

const login = Router();

const segredo = process.env.SECRET_KEY || 2147483647;

login.route('/').post(rescue(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({ message: 'All fields must be filled' });
  }

  const user = await services.checkLogin(email, password);

  if (user.error) return res.status(401).json(user.message);
  req.user = user;
  next();
}),
rescue(async (req, res) => {
  const emailUser = await models.getUser(req.user);
  console.log(req.user);
  if (!emailUser) return res.status(401).json({ message: 'Incorrect username or password' });
  const token = jwt.sign({ user: req.user }, segredo, { expiresIn: '1h', algorithm: 'HS256' });
  res.status(200).json({ token });
}));

module.exports = login;
