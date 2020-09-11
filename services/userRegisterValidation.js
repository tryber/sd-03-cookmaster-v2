const { userByEmail } = require('../models');
const { validateEmail } = require('../utils');

const getUser = async (userEmail) => {
  try {
    const user = await userByEmail(userEmail);

    return user ? user.email : null;
  } catch (error) {
    throw new Error(error.message);
  }
};

const validationMessages = {
  user: 'Email already registered',
  default: 'Invalid entries. Try again.',
};

async function ValidateUser(name, email, password) {
  const searchUser = await getUser(email);
  switch (true) {
    case email === searchUser:
      return validationMessages.user;
    case !email || !validateEmail(email):
      return validationMessages.default;
    case password.length < 5:
      return validationMessages.default;
    case !name:
      return validationMessages.default;
    default:
      return null;
  }
}

module.exports = async (name, email, password) => {
  try {
    const dataValidation = await ValidateUser(name, email, password);

    return { message: dataValidation };
  } catch (error) {
    throw new Error(error.message);
  }
};
