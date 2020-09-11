const userServices = require('../services/user');
const jwt = require('../services/jwt');

async function create(res, req, next, cb) {
  try {
    const user = await cb(req.body);
    res.status(201).send({ user });
  } catch (err) {
    next(err);
  }
}

async function createUser(req, res, next) {
  await create(res, req, next, userServices.createUser);
}

async function createAdmin(req, res, next) {
  await create(res, req, next, userServices.createAdmin);
}

async function loginUser(req, res, next) {
  try {
    const { body } = req;
    const token = jwt.getToken(body);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
}

module.exports = { createUser, loginUser, createAdmin };
