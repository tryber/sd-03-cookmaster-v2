const { Router } = require('express');
const rescue = require('express-rescue');
const Boom = require('boom');
const services = require('../services');
const middleware = require('../middleware');

const users = Router();

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateNewUser = rescue(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || !REGEX.test(email)) {
    return res.status(400).send('Requisição mal sucessedida');
  }

  const checkUserExist = await services.getUserByEmail(email);
  if (checkUserExist) {
    return next(Boom.conflict('Email já cadatrato'));
  }

  return next();
});

const createUser = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  const user = await services.createUser('user', { name, email, password });
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
