const { Router } = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const Boom = require('@hapi/boom');
const usersService = require('../users/usersService');
const schemas = require('./schemas');

const loginRouter = Router();

const secret = 'seusecretdetoken';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = schemas.loginSchema.validate({ email, password });
  if (error) return next(Boom.unauthorized('All fields must be filled', 'invalid_data'));
  const user = await usersService.findUserByEmail(email);
  if (!user || password !== user.password) {
    return next(Boom.unauthorized('Incorrect username or password', 'invalid_data'));
  }
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  res.status(200).json({ token });
});

loginRouter.post('/', login);

module.exports = loginRouter;
