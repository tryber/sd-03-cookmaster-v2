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

module.exports = {
  createUser,
};
