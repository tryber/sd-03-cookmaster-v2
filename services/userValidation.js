const { userByEmail } = require('../models');

/* Regex obtido em
https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address */
const validateEmail = (email = '') =>
  email
  && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );

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
    case password.length < 6:
      return validationMessages.default;
    case !name:
      return validationMessages.default;
    default:
      return null;
  }
}

module.exports = async (name, email, password) => {
  let message;
  try {
    const dataValidation = await ValidateUser(name, email, password);
    message = dataValidation;

    return { message };
  } catch (error) {
    throw new Error(error.message);
  }
};
