const Validator = require('validatorjs');
const { findUser } = require('../../users/userModel');

const validateEntries = (req, next) => {
  const validate = new Validator(req.body, {
    name: 'required',
    password: 'required',
    email: 'required|email',
  });

  validate.checkAsync(() => null, () => next('invalid_entries'));
};

const validateUserSingup = async (req, _res, next) => {
  try {
    validateEntries(req, next);
    const user = await findUser(req.body.email, 'email');
    if (user) next('email_registered');
    next();
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const validateAdminSingup = async (req, _res, next) => {
  try {
    validateEntries(req, next);

    if (req.user.role !== 'admin') next('not_admin');

    const user = await findUser(req.body.email, 'email');
    if (user) next('email_registered');
    next();
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const validateLogin = async (req, _res, next) => {
  try {
    const { email, password } = req.body;

    const validate = new Validator(req.body, {
      password: 'required',
      email: 'required',
    });
    validate.checkAsync(() => null, () => next('missing_login_entries'));

    const user = await findUser(email, 'email');
    if (!user
        || user.password !== password) next('incorrect_login');

    next();
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = { validateUserSingup, validateLogin, validateAdminSingup };
