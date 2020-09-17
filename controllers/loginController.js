const rescue = require('express-rescue');
const { userService } = require('../services');

const userLogin = rescue(async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.userLogin(email, password);

  if (user.message) {
    return res.status(401).json(user);
  }

  return res.status(200).json(user);
});

module.exports = userLogin;
