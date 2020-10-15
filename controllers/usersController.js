const { Router } = require('express');
const rescue = require('express-rescue');
const Boom = require('boom');
const services = require('../services');
const middleware = require('../middleware');

const users = Router();

// https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
const REGEX = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

const validateNewUser = rescue(async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password || !REGEX.test(req.body.email)) {
    console.log(res.body);
    return next(Boom.badRequest('dados invalidos'));
  }

  const checkUserExist = await services.getUserByEmail(req.body.email);
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
