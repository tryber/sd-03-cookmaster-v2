const express = require('express');
const rescue = require('express-rescue');
const { usersServices } = require('../services');

const UsersRouter = express.Router();

const REGEX = /^[A-z0-9]+(\.?[A-z0-9]+)?@[A-z0-9]+(\.?[A-z0-9]+)?$/;

const CheckNewUser = rescue(async (req, res, next) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password || !REGEX.test(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const user = await usersServices.getUserByEmail(email);
  if (user) return res.status(409).json({ message: 'Email already registered' });

  return next();
});

const CreateUser = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const users = await usersServices.createUser('user', { name, email, password });
  return res.status(201).json({ user: users });
});

UsersRouter.route('/')
  .post(CheckNewUser, CreateUser);

module.exports = UsersRouter;
