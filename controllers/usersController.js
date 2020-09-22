// service
const { CreateUser } = require('../services/userServices');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { ok, status, message, user } = await CreateUser(name, email, password);
  return ok ? res.status(status).json({ user }) : res.status(status).json({ message });
};

const createAdmin = async (_req, res) => res.status(404);

module.exports = {
  createAdmin,
  createUser,
};
