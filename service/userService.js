const userModel = require('../model/userModel');
const { validateNewUser, messages, codes } = require('./error');

const newUser = async (name, email, password) => {
  //* Validações
  const valid = validateNewUser(name, email, password);
  if (valid.code) return valid;

  //* Verifica se o e-mail é unico:

  const findEmail = await userModel.findEmail(email);
  if (findEmail) return { code: codes[409], message: messages[2] };

  //* Após validações é feito o cadastramento no MongoDB
  const user = await userModel.createUser(name, email, password);
  return { user };
};

module.exports = {
  newUser,
};
