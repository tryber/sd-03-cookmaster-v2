const { Router } = require('express');
const { LogUser } = require('../services/userServices');

const loginRoute = Router();

const login = async (req, res) => {
  const { email, password } = req.body;
  const { isValid, status, message, token } = await LogUser(email, password);
  return isValid
    ? res.status(status).json({ token })
    : res.status(status).json({ message });
};

loginRoute.route('/').post(login);

module.exports = loginRoute;
