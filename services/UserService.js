const userModel = require('../models/UserModel');

const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateData = async ({ name, email }) => {
  if (name === undefined) {
    return { code: 'invalid_data', message: 'Invalid entries. Try again.' };
  }

  const emailExists = await userModel.searchByEmail(email);

  if (emailExists !== null) {
    return { code: 'email_Exists', message: 'Email already registered' };
  }
  if (!email) {
    return { code: 'invalid_data', message: 'Invalid entries. Try again.' };
  }

  const isEMailValid = isValidEmail(email);
  if (!isEMailValid) {
    return { code: 'invalid_data', message: 'Invalid entries. Try again.' };
  }
};

const createUserService = async (name, email, password) => {
  const userInfo = { name, email, password };

  const validateINfo = await validateData(userInfo);
  console.log(validateINfo);
  if (validateINfo !== undefined) {
    return validateINfo;
  }
  if (password === undefined) {
    return { code: 'invalid_data', message: 'Invalid entries. Try again.' };
  }

  const createUser = await userModel.createUserModel(userInfo);
  return createUser;
};

module.exports = {
  createUserService,
};
