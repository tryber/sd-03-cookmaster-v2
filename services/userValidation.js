const { userByEmail } = require('../models');

/* Regex criado com orientação do instrutor Neto. Acrescimo do método .trim para
permitir cadastro de string contendo espaços em branco */
const validateName = (name = '') => name && /^[A-Z][a-z]{2,}$/i.test(name.trim());

/* Regex obtido em
https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address */
const validateEmail = (email = '') =>
  email &&
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );

const getUser = async (userEmail) => {
  try {
    const user = userEmail && (await userByEmail(userEmail));
    return user.email;
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
    case !validateEmail(email):
      return validationMessages.default;
    case password.length < 6:
      return validationMessages.default;
    case !validateName(name):
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
