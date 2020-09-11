const { Router } = require('express');
const jwt = require('jsonwebtoken');
const service = require('./serviceUsers');
const { validadePassword } = require('../validation/validation');

const users = Router();

users.post('/users', async (req, res) => {
  const role = 'user';
  const { name, email, password } = req.body;
  const result = await service.registerUsers(name, email, password, role);

  if (result.validate) {
    return res.status(400).json(result.validate);
  }
  if (result.checkEmail) {
    return res.status(409).json(result.checkEmail);
  }
  return res.status(201).json({ user: result });
});

const secret = 'secret';

users.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userEmail = await service.checkEmail(email);
  const userPassword = await service.checkPassword(password);

  if (validadePassword(password)) return res.status(401).json({ message: 'All fields must be filled' });
  if (!userEmail) return res.status(401).json({ message: 'Incorrect username or password' });
  if (!userPassword) return res.status(401).json({ message: 'All fields must be filled' });

  const { _id, email: emailPayload, role } = userEmail;
  const jwtConfig = { algorithm: 'HS256', expiresIn: '15' };
  const token = jwt.sign({ _id, emailPayload, role }, secret, jwtConfig);

  return res.status(200).json({ token });
});

module.exports = users;
