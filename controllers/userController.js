const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const userService = require('../services/userService');

const JWT_SECRET = 'shhhhhitsasecret!';

const addUser = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const result = await userService.addUser({ name, email, password });

  if (result.error) return res.status(400).json({ message: result.message });
  if (result.error2) return res.status(409).json({ message: result.message });

  res.status(201).json({ user: result });
});

const userLogin = rescue(async (req, res) => {
  const { email, password } = req.body;
  const result = await userService.userLogin(email, password);

  if (result.error) return res.status(401).json({ message: result.message });

  const signOptions = {
    algorithm: 'HS256',
    expiresIn: '15m',
  };

  const token = jwt.sign(result, JWT_SECRET, signOptions);

  res.status(200).json({ token });
});

module.exports = {
  addUser,
  userLogin,
};
