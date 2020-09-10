const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { usersService, loginService } = require('../services');

const loginRouter = Router();

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next({ status: 401, message: 'All fields must be filled' });
  const { email, password } = req.body;
  const user = await usersService.login(email, password);
  if (!user) return next({ status: 401, message: 'Incorrect username or password' });
  const token = await loginService.sign(user);
  return res.status(200).json({ token });
};

loginRouter.route('/').post([body('email').exists(), body('password').exists()], login);

module.exports = loginRouter;
