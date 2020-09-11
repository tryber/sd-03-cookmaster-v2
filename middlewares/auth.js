const jwt = require('jsonwebtoken');
const { usersModel } = require('../models');

const secret = 'secret';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const authLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(401).json({ message: 'All fields must be filled' });

  const user = await usersModel.getUserByEmail(email);

  if (user === null) return res.status(401).json({ message: 'Incorrect username or password' });

  if (password !== user.password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  const token = jwt.sign({ user }, secret, jwtConfig);

  return res.status(200).json(token);
};

module.exports = authLogin;
