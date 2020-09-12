const { CreateUser, CreateAdmin, SearchUser } = require('../services');
const { generateError, validateEmail } = require('../utils');

const createUser = async (req, res, next) => {
  try {
    const user = await CreateUser(req.body);

    if (user.message) throw new Error(user.message);

    return res.status(201).json({ user });
  } catch (error) {
    if (error.message === 'Email already registered') return next(generateError(409, error));
    return next(generateError(400, error));
  }
};

const createAdmin = async (req, res, next) => {
  const { user, body } = req;
  const { role } = user;
  try {
    if (role !== 'admin') throw new Error('Only admins can register new admins');

    const admin = await CreateAdmin(body);

    if (admin.message) throw new Error(admin.message);
  } catch (error) {
    if (error.message !== 'Only admins can register new admins') return next(generateError(400, error));
    return next(generateError(403, error));
  }
};

const userLogin = async (req, _res, next) => {
  try {
    const { email, password } = req.body;
    const user = await SearchUser(email, null);

    if (!email || !password) throw new Error('All fields must be filled');

    if (
      !validateEmail(email)
      || password.length < 5
      || !user
      || user.email !== email
      || user.password !== password
    ) throw new Error('Incorrect username or password');

    req.data = user;
    return next();
  } catch (error) {
    return next(generateError(401, error));
  }
};

module.exports = { createUser, createAdmin, userLogin };
