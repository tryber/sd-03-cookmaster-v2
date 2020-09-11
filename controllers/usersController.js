const rescue = require('express-rescue');
const { usersService } = require('../services');

const newUser = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const result = await usersService.addUser({ name, email, password });

  if (result.error && result.error.message === 'Email already registered') {
    return res.status(409).json(result.error);
  }

  if (result.error) return res.status(400).json(result.error);

  return res.status(201).json(result);
});

module.exports = {
  newUser,
};
