const _ = require('lodash');
const { getUser } = require('../models/user');
const Err = require('./Error');

const err = new Err();

function emailValidation(email) {
  if (!email.includes('@')) return false;
  if (!email.includes('.com')) return false;
  return true;
}

// function uniqueValidation(property, array) {
//   return _.includes(array, property);
// }

// function passwordValidation(password, options = {}) {

// }

async function user(req, res, next) {
  const { name, email, password } = req.body;
  const error = { status: 400, message: 'Invalid entries. Try again.' };
  if (!name || !email || !password) {
    return next(error);
  }
  if (!emailValidation(email)) {
    return next(error);
  }
  const userInDb = await getUser(email, 'email');
  if (userInDb.length) {
    return next({ status: 409, message: 'Email already registered' });
  }
  return next();
}

async function validadeLogin({ email, password }) {
  const [userInDb] = await getUser(email, 'email');
  return userInDb && userInDb.password === password;
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const error = { status: 401, message: 'All fields must be filled' };
  if (!email || !password) {
    return next(error);
  }
  const isValid = await validadeLogin({ email, password });
  if (!isValid) {
    return next(err.notSign);
  }
  return next();
}

async function recipes(req, res, next) {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return next(err.invalidEntries);
  }
  next();
}

module.exports = { user, login, recipes };
