const boom = require('@hapi/boom');
const { userService } = require('../services');

const createUser = async (req, res, next) => {
  const { userInfo } = req;

  const resultUserCreate = await userService.createUser(userInfo);

  if (!resultUserCreate) {
    return next(boom.conflict('Email already registered'));
  }

  return res.status(201).json(resultUserCreate);
};

const createAdmin = async (req, res, next) => {
  const { userInfo } = req;
  const { role } = req.user;

  if (role !== 'admin') {
    return next(boom.forbidden('Only admins can register new admins'));
  }

  const resultAdminCreate = await userService.createAdmin(userInfo);

  return res.status(201).json(resultAdminCreate);
};

const login = async (req, res, next) => {
  const { userInfo } = req;

  const loginResponse = await userService.login(userInfo);

  if (!loginResponse) {
    return next(boom.unauthorized('Incorrect username or password'));
  }

  return res.status(200).json({ token: loginResponse });
};

module.exports = {
  login,
  createUser,
  createAdmin,
};
