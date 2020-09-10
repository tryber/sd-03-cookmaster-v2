const model = require('../model/model');

const entriesVerify = (name, email, password) => {
  let result;
  if (!name) {
    result = { message: 'Invalid entries. Try again.', status: 400 };
  }
  if (!email) {
    result = { message: 'Invalid entries. Try again.', status: 400 };
  }
  if (!password) {
    result = { message: 'Invalid entries. Try again.', status: 400 };
  }
  return result;
};

const createNewUser = async (name, email, password) => {
  // regras de negócio
  let verify;
  verify = entriesVerify();

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
