const { Router } = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const login = Router();

const secret = 'seusecretdetoken';
login.post(
  '/',
  rescue(async (req, res) => {
    const { email, password } = req.body;
    const checkLogin = await loginService.loginCheck(email, password);
    if (checkLogin.code !== 'valid') {
      return res.status(401).json(checkLogin);
    }
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: email }, secret, jwtConfig);
    return res.status(200).json({
      token,
      expires: jwtConfig.expiresIn,
    });
  }),
);

module.exports = login;
