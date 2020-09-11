const userServices = require('../services/user');
const jwt = require('../services/jwt');

async function create(res, req, cb) {
  const user = await cb(req.body);
  res.status(201).send({ user });
}

async function createUser(req, res, next) {
  try {
    await create(res, req, userServices.createUser);
  } catch (err) {
    next(err);
  }
}

async function createAdmin(req, res, next) {
  try {
    await create(res, req, userServices.createAdmin);
  } catch (err) {
    next(err);
  }
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
