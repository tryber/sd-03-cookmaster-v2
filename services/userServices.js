const { createUser, userByEmail } = require('../models');
const userValidation = require('./userRegisterValidation');

const create = async ({ name, email, password }) => {
  try {
    const validation = await userValidation(name, email, password);

    const newUser = !validation.message && (await createUser(name, email, password));

    return validation.message ? { message: validation.message } : { ...newUser };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const userData = await userByEmail(email);
    return userData;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { create, getUserByEmail };
