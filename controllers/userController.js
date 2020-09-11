const rescue = require('express-rescue');
const productService = require('../services/userService');

const addUser = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const result = await productService.addUser({ name, email, password });

  if (result.error) return res.status(400).json({ message: result.message });
  if (result.error2) return res.status(409).json({ message: result.message });

  res.status(201).json({ user: result });
});

module.exports = {
  addUser,
};
