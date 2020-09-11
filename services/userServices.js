const { createUser, userByEmail, userById } = require('../models');
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

const getUser = async (email = null, id = null) => {
  let userData;
  try {
    if (email) userData = await userByEmail(email);

    if (id) userData = await userById(id);

    return userData;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { create, getUser };
