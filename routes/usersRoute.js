const { Router } = require('express');

const users = Router();

users.get('/', (req,res) => {
  res.status(200).json({ test: 'ok' })
});

module.exports = users;
