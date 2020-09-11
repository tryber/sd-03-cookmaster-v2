require('dotenv/config');
const express = require('express');
const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const Boom = require('boom');

const { usersServices } = require('../services');

const loginRouter = express.Router();
const { SECRET = 'preguica de criar um segredo' } = process.env;
const tokenConfig = {
  expiresIn: '8d',
  algorithm: 'HS256',
};

loginRouter.route('/')
  .post(rescue(async (req, _res, next) => {
    const { email, password } = req.body || {};
    if (!email || !password) return next(Boom.unauthorized('All fields must be filled'));
    const user = await usersServices.validateLogin(email, password);
    if (user.error) return next(Boom.unauthorized(user.message));
    req.user = user;
    next();
  }), rescue(async (req, res) => {
    const token = jwt.sign({ user: req.user }, SECRET, tokenConfig);
    res.status(200).json({ token });
  }));

module.exports = loginRouter;
