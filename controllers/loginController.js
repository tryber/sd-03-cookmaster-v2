const { Router } = require('express');
const rescue = require('express-rescue');
const loginService = require('../services/loginService');

const login = Router();

login.post(
  '/',
  rescue(async (req, res) => {
    const { email, password } = req.body;
    const checkLogin = await loginService.loginCheck(email, password);
    if (checkLogin !== undefined) {
      return res.status(401).json(checkLogin);
    }
    return res.status(200).json(checkLogin);
  }),
);

module.exports = login;
