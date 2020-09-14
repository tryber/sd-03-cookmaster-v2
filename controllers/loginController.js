const { Router } = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

let token;
const login = Router();
function jwtDecodification(tokenP) {
  const secret = 'seusecretdetoken';
  if (tokenP !== undefined) {
    if (tokenP.length < 170) {
      return { code: 'no_name', message: 'Invalid entries. Try again.' };
    }
    return jwt.verify(tokenP, secret);
  }
}
function jwtGenerator(email, res) {
  const secret = 'seusecretdetoken';
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  token = jwt.sign({ data: email }, secret, jwtConfig);
  return res.status(200).json({
    token,
    expires: jwtConfig.expiresIn,
  });
}
login.post(
  '/',
  rescue(async (req, res) => {
    const { email, password } = req.body;
    const checkLogin = await loginService.loginCheck(email, password);
    if (checkLogin.code !== 'valid') {
      return res.status(401).json(checkLogin);
    }
    return jwtGenerator(email, res);
  }),
);

module.exports = { login, jwtDecodification };
