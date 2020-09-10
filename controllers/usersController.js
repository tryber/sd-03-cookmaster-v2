const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const usersService = require('../services/usersService');
const loginService = require('../services/loginService');

const userRouter = Router();

userRouter
  .route('/')
  .get(async (_req, res) => res.status(200).send('Hello GET'))
  .post(
    [body('name').isLength({ min: 5 }), body('email').isEmail(), body('password').exists()],
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return next({ status: 400, message: 'Invalid entries. Try again.' });
      const { name, email, password } = req.body;
      if (await usersService.findUserByEmail(email)) {
        return next({ status: 409, message: 'Email already registered' });
      }
      try {
        const userCreated = await usersService.register(name, email, password, 'user');
        return res.status(201).json({ user: { ...userCreated } });
      } catch (error) {
        return next({ message: error });
      }
    },
  );

const insertAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const { user } = req;
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }
  const newUser = await usersService.register(name, email, password, 'admin');
  return res.status(201).json({ user: newUser });
};
userRouter.route('/admin').post(loginService.auth, insertAdmin);

module.exports = userRouter;
