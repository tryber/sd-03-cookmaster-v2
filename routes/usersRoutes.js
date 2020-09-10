const { CreateUser } = require('../services');
const { generateError } = require('../utils');

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

module.exports = { createUser };
