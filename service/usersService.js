const usersModel = require('../models/usersModel');

const getAllUsers = async () => {
  const list = await usersModel.getAllUsers();
  return list;
};

const validateImputs = async (name, email, password) => {
  const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  if (!name || !email || !password || !email.match(emailTest)) {
    return {
      cod: 400,
      error: true,
      message: 'Invalid entries. Try again.',
    };
  }
  return { error: false };
};

const createUsers = async (name, email, password) => {
  const testEmail = await getAllUsers()
    .then((res) => res.some((elem) => elem.email === email));

  if (testEmail) {
    return {
      cod: 409,
      error: true,
      message: 'Email already registered',
    };
  }

  const validation = await validateImputs(name, email, password);

  if (validation.error) return validation;

  return usersModel.createUser(name, email, password);
};

module.exports = {
  getAllUsers,
  createUsers,
};
