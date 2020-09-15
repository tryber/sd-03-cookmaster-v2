const express = require('express');
const rescue = require('express-rescue');
const Boom = require('boom');

const { usersServices } = require('../services');
const { auth } = require('../middlewares');

const usersRouter = express.Router();

const EMAIL_REGEX = /^[A-z0-9]+(\.?[A-z0-9]+)?@[A-z0-9]+(\.?[A-z0-9]+)?$/;
const INVALID_ENTRIES = 'Invalid entries. Try again.';

const validateNewUser = rescue(async (req, _res, next) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password || !EMAIL_REGEX.test(email)) {
    return next(Boom.badRequest(INVALID_ENTRIES));
  }

  const user = await usersServices.getUserByEmail(email);
  if (user) return next(Boom.conflict('Email already registered'));

  return next();
});

const createUser = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await usersServices.createUser('user', { name, email, password });
  return res.status(201).json({ user });
});

const createAdmin = rescue(async (req, res, next) => {
  const { user: { role }, body: { name, email, password } } = req;
  if (role !== 'admin') return next(Boom.forbidden('Only admins can register new admins'));

  const user = await usersServices.createUser('admin', { name, email, password });
  return res.status(201).json({ user });
});

usersRouter.route('/')
  .post(validateNewUser, createUser);

usersRouter.route('/admin')
  .post(auth, validateNewUser, createAdmin);

module.exports = usersRouter;
