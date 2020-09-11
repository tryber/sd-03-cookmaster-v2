const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const secret = 'cookmastersecret';

const verifyFields = (name, email, password) => {
  if (!name) {
    return { status: 400, message: 'Invalid entries. Try again.' };
  }
  if (!email || !email.match(emailTest))  {
    return { status: 400, message: 'Invalid entries. Try again.' };
  }
  if (!password) {
    return { status: 400, message: 'Invalid entries. Try again.' };
  }
  return null;
};

const verifyLogin = (email, password) => {
  if (!email)  {
    return { status: 401, message: 'All fields must be filled' };
  }
  if(!email.match(emailTest)) {
    return { status: 401, message: 'Incorrect username or password' };
  }
  if (!password) {
    return { status: 401, message: 'All fields must be filled' };
  }
  return null;
};

const add = async (name, email, password) => {
  const verify = verifyFields(name, email, password);

  if (verify) return verify;

  if (await userModel.findByEmail(email)) {
    return { status: 409,  message: 'Email already registered' };
  }

  return userModel.add(name, email, password);
};

const login = async (email, reqPassword) => {
  const verify = verifyLogin(email, reqPassword);

  if (verify) return verify;

  const user = await userModel.findByEmail(email);

  if(!user || user.password !== reqPassword) {
    return { status: 401, message: 'Incorrect username or password' };
  }

  const jwtConfig = {
    expiresIn: '10m',
    algorithm: 'HS256',
  };

  const { name, password, ...data } = user;

  const token = jwt.sign({ data }, secret, jwtConfig);

  return token;
}

module.exports = {
  add,
  login,
};
