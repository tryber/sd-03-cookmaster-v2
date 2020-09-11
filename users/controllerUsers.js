const { Router } = require('express');
const jwt = require('jsonwebtoken');
const service = require('./serviceUsers');

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

const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };
const secret = 'secret'; // jwt = {payload} + segredo + jwtConfig;
const token = jwt.sign({ id: _id, name, admin: false }, secret, jwtConfig);

// res.status(200).json({
//   token : token,
//   expires: expires
// })

users.get('/login', async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) return res.status(401).json({ mess: 'sem name || password' });

  const result = await service.checkLogin(name);

  if (result) return res.status(200).json({ message: 'exist' });
  return res.status(401).json({ message: 'não existe' });
});

module.exports = users;
