const rescue = require('express-rescue');
const { userServices } = require('../services'); // Changed. Attention

const registerUser = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await userServices.createUser(name, email, password, 'user');
  if (newUser.err) return res.status(409).json(newUser.message);
  return res.status(201).json(newUser);
});

const registerAdmin = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const { _id: userId } = req.user;
  const newAdmin = await userServices.createAdmin(name, email, password, userId, 'admin');
  if (newAdmin.err) return res.status(403).json(newAdmin.message);
  return res.status(201).json(newAdmin);
});

const loginUser = rescue(async (req, res) => {
  const { email, password } = req.body;
  const token = await userServices.tryLoginToken(email, password);
  if (token.err) {
    return res.status(401).json(token.message);
  }
  return res.status(200).json(token);
});

module.exports = {
  registerUser,
  loginUser,
  registerAdmin,
};
