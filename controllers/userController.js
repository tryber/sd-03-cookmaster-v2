const rescue = require('express-rescue');
const userServices = require('../services/userServices');

const registerUser = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await userServices.createUser(name, email, password, 'user');
  if (newUser.err) return res.status(409).json(newUser.message);
  return res.status(201).json(newUser);
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
};
