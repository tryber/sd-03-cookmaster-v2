require('dotenv/config');
const express = require('express');
const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const { usersServices } = require('../services');

const LoginRouter = express.Router();

const { SECRET_KEY = '6437658488' } = process.env;

LoginRouter.route('/')
  .post(rescue(async (req, res, next) => {
    const { email, password } = req.body || {};

    if (!email || !password) return res.status(401).json({ message: 'All fields must be filled' });

    const user = await usersServices.checkLogin(email, password);

    if (user.error) return res.status(401).json({ message: 'Incorrect username or password' });

    req.user = user;

    next();
  }), rescue(async (req, res) => {
    const token = jwt.sign({ user: req.user }, SECRET_KEY, {
      expiresIn: '10d',
      algorithm: 'HS256',
    });
    res.status(200).json({ token });
  }));

module.exports = LoginRouter;
