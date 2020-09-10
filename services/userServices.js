const model = require('../model/model');
const createNewUser = async (name, email, password) => {
  // regras de negócio
  if (!name) {
    return { message: 'Invalid entries. Try again.', status: 400 };
  }
  if (!email) {
    return { message: 'Invalid entries. Try again.', status: 400 };
  }
  if (!password) {
    return { message: 'Invalid entries. Try again.', status: 400 };
  }
  const emailExistis = await model.getUserByEmail(email);
  if (emailExistis && emailExistis.email === email) {
    return { message: 'Email already registered', status: 409 };
  }
  return await model.createUser(name, email, password)
};

const findUserByemail = async (email) => await model.getUserByEmail(email);

module.exports = {
  createNewUser,
  findUserByemail,
};
