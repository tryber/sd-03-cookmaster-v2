const rescue = require('express-rescue');
const userService = require('../services/userService');

const createUser = rescue(async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
});

module.exports = { createUser };
