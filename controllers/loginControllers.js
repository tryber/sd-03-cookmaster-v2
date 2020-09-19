const { Router } = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');

const loginService = require('../service/loginService');

const login = Router();

const secret = 'xablaublaxablau';

login.post('/', rescue(async (req, res) => {
  const { email, password } = req.body;

  const user = await loginService.checkLogin(email, password);

  if (user.error) {
    return res.status(user.cod).json({
      message: user.message,
    });
  }

  const jwtConfig = {
    expiresIn: '20m',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);

  res.status(200).json({
    token,
  });
}));

// users.post('/', rescue(async (req, res) => {
//   const { name, email, password, role } = req.body;

//   const user = await usersService.createUsers(name, email, password, role);

//   console.log(user);

//   if (user.error) {
//     return res.status(user.cod).json({
//       message: user.message,
//     });
//   }

//   return res.status(201).json(user);
// }));

module.exports = login;
