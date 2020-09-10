const { Router } = require('express');
const service = require('./serviceUsers');

const users = Router();

users.post('/', async (req, res) => {
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

module.exports = users;
