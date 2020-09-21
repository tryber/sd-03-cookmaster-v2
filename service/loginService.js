const jwt = require('jsonwebtoken');

const { secret } = require('./secret');
const userModel = require('../model/userModel');
const error = require('./error');

const login = async (email, password) => {
  //* Validações
  const valid = error.validateLogin(email, password);
  if (valid.code) return valid;

  //* Valida se encontra usuário
  //! Retorna erro se não encontrar

  const user = await userModel.emailPass(email, password);
  if (!user) return { code: error.codes[401], message: error.messages[4] };

  //* Localizado o user é gerado o token:
  const signOptions = {
    algorithm: 'HS256',
    expiresIn: '2d',
  };

  //* Modificação do objeto user para não retornar dado sensível (password);
  const { password: _, ...userData } = user;

  const token = jwt.sign(userData, secret, signOptions);

  return { token };
};

module.exports = {
  login,
};
