const jwt = require('jsonwebtoken');
const rescue = require('express-rescue')
const { ErrorClass } = require('../utils/ErrorClass');
const { getUserWithEmail } = require('../models/usersModels');

const secret = 'meuSegredoCriptografado';

module.exports = rescue(async (req, res, next) => {
  const token = req.headers.authorization; // Como envio o token na header da requisicao?

  if (!token) {
    throw new ErrorClass(401, 'invalid token', 'invalid_data');
  }

  if (!token.includes('.')) {
    throw new ErrorClass(401, 'jwt malformed', 'invalid_data');
  }

  const decoded = jwt.verify(token, secret);

  const user = await getUserWithEmail(decoded.data.email);

  if (!user) {
    throw new ErrorClass(401, 'Erro ao procurar usuário do token', 'invalid_data');
  }

  req.user = user;
  next();
});
