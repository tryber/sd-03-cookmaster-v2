const userModel = require('../models/userModel');

const validateUser = async (name, email, password) => {
  if (!name || !email || !password || !email.match(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)) {
    return ({ error: true, message: 'Invalid entries. Try again.' });
  }

  const exists = await userModel.getUserByEmail(email);
  if (exists) {
    return ({ error2: true, message: 'Email already registered' });
  }
};

const addUser = async ({ name, email, password }) => {
  const validate = await validateUser(name, email, password);

  if (validate) {
    return validate;
  }

  const result = await userModel.add({ name, email, password, role: 'user' });
  return result;
};

const userLogin = async (emailT, password) => {
  if (!emailT || !password) {
    return ({ error: true, message: 'All fields must be filled' });
  }

  const user = await userModel.validateUserAndEmail(emailT, password);

  if (!user) {
    return ({ error: true, message: 'Incorrect username or password' });
  }

  const { _id, email, role } = user;

  return ({ _id, email, role });
};

module.exports = {
  addUser,
  userLogin,
};
