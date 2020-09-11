const model = require('./modelUsers');
const { validateEntries, checkEmailExist, validateLogin, validadePassword } = require('../validation/validation');

const registerUsers = async (name, email, password, role) => {
  const validate = validateEntries(name, email, password);
  const checkEmail = await checkEmailExist(email);
  if (validate) return { validate };
  if (checkEmail) return { checkEmail };
  return model.registerUsers(name, email, password, role);
};

const checkEmail = async (email) => {
  const validate = validateLogin(email);
  if (validate) return { validate };
  return model.checkEmail(email);
};

const checkPassword = async (password) => {
  const validate = validadePassword(password);
  if (validate) return { validate };
  return model.checkPassowrd(password);
};

module.exports = {
  registerUsers,
  checkEmail,
  checkPassword,
};
