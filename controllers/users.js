const userServices = require('../services/user');
const jwt = require('../services/jwt');

async function createUser(req, res, next) {
  try {
    const user = await userServices.createUser(req.sbody);
    res.status(201).send({ user });
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

async function createAdmin(req, res, next) {
  try {
    const user = await userServices.createAdmin(req.body);
    res.status(201).send({ user });
  } catch (err) {
    next(err);
  }
}

module.exports = { createUser, loginUser, createAdmin };
