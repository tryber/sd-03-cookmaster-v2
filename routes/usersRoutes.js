const { CreateUser, SearchByEmail } = require('../services');
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

const userLogin = async (req, _res, next) => {
  try {
    const { email, password } = req.body;
    const user = await SearchByEmail(email);

    if (!email || !password) throw new Error('All fields must be filled');

    if (!validateEmail(email) || password.length < 8 || !user || user.email !== email || user.password !== password) throw new Error('Incorrect username or password');

    req.data = user;
    return next();
  } catch (error) {
    return next(generateError(401, error));
  }
};

module.exports = { createUser, userLogin };
