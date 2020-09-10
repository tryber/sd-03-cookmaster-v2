const model = require('../model/model');

const createNewUser = async (name, email, password) => {
  // regras de negócio
  let verify;

  if (!name) {
    verify = { message: 'Invalid entries. Try again.', status: 400 };
  }
  if (!email) {
    verify = { message: 'Invalid entries. Try again.', status: 400 };
  }
  if (!password) {
    verify = { message: 'Invalid entries. Try again.', status: 400 };
  }

  const emailExistis = await model.getUserByEmail(email);

  if (emailExistis && emailExistis.email === email) {
    verify = { message: 'Email already registered', status: 409 };
  }

  if (verify) {
    return verify;
  }

  return model.createUser(name, email, password);
};

const findUserByemail = async (email) => model.getUserByEmail(email);

module.exports = {
  createNewUser,
  findUserByemail,
};
