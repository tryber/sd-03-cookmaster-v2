const { Router } = require('express');
const auth = require('../middlewares/authMiddleware');
const { CreateAdmin, CreateUser } = require('../services/userServices');

const usersRoute = Router();

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { ok, status, message, user } = await CreateUser(name, email, password);
  return ok ? res.status(status).json({ user }) : res.status(status).json({ message });
};

const createAdmin = async (req, res) => {
  const { user: { role }, body: { name, email, password } } = req;
  const { ok, status, message, user } = await CreateAdmin(role, name, email, password);
  return ok ? res.status(status).json({ user }) : res.status(status).json({ message });
};

usersRoute.route('/').post(createUser);

usersRoute.route('/admin').post(auth(true), createAdmin);

module.exports = usersRoute;
