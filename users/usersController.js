const { Router } = require('express');
const rescue = require('express-rescue');
const Boom = require('@hapi/boom');
const validateJWT = require('../middlewares/validateJWT');
const { verifyIsAdmin } = require('../middlewares/errorHandler');
const usersService = require('./usersService');
const schemas = require('./schemas');

const usersRouter = Router();

const newUser = rescue(async (req, res, next) => {
  const { name, email, password } = req.body;
  const { error } = schemas.userSchema.validate({ name, email, password });
  if (error) return next(Boom.badRequest('Invalid entries. Try again.', 'invalid_data'));
  const user = await usersService.addUser(name, email, password, 'user');
  res.status(201).json({ user });
});

const newAdmin = rescue(async (req, res, next) => {
  const { name, email, password } = req.body;
  const { error } = schemas.userSchema.validate({ name, email, password });
  if (error) return next(Boom.badRequest('Invalid entries. Try again.', 'invalid_data'));
  const user = await usersService.addUser(name, email, password, 'admin');
  res.status(201).json({ user });
});

usersRouter.post('/', newUser);

usersRouter.post('/admin', validateJWT, verifyIsAdmin, newAdmin);

module.exports = usersRouter;
