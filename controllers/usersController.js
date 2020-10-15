const { Router } = require('express');
const rescue = require('express-rescue');
const Boom = require('boom');
const services = require('../services');
const middleware = require('../middleware');

const users = Router();

// https://regexr.com/3e48o
const REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const validateNewUser = rescue(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || !REGEX.test(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const checkUserExist = await services.getUserByEmail(email);
  if (checkUserExist) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  return next();
});

const createUser = rescue(async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await services.createUser('user', { name, email, password, role });
  return res.status(201).json({ user });
});

const createUserAdmin = rescue(async (req, res, next) => {
  const { user: { role }, body: { name, email, password } } = req;
  if (role !== 'admin') return next(Boom.forbidden('Apenas admins'));

  const user = await services.createUser('admin', { name, email, password });
  return res.status(201).json({ user });
});

users.route('/')
  .post(validateNewUser, createUser);

users.route('/admin')
  .post(middleware.auth, validateNewUser, createUserAdmin);

module.exports = users;
