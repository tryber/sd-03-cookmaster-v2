const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const {
  EMAIL_ALREADY_REGISTERED,
  errMessage,
  INCORRECT_USERNAME_OR_PASSWORD,
} = require('../middlewares/errosMessage');

const SECRET = 'DiegoRafael-sd03';

const createUser = async (name, email, password, role) => {
  const verifyEmail = await userModel.findUserByEmail(email);
  const registerUser = await userModel.createUser(name, email, password, role);

  if (verifyEmail) {
    const result = errMessage(EMAIL_ALREADY_REGISTERED);
    return result;
  }
  return registerUser;
};

const verifyLoginTonken = async (emailUser, password) => {
  const userEmail = await userModel.findUserByEmail(emailUser);

  if (!userEmail || userEmail.password !== password) {
    const response = errMessage(INCORRECT_USERNAME_OR_PASSWORD);
    return response;
  }

  const { _id, email, role } = userEmail;

  const sing = {
    algorithm: 'HS256',
    expiresIn: '15m',
  };

  const token = jwt.sign({ _id, email, role }, SECRET, sing);
  return { token };
};

module.exports = { createUser, verifyLoginTonken };
