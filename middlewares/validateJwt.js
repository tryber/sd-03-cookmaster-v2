// Middleware baseado no material didático referente a JWT. ©2020 TRYBE
const jwt = require('jsonwebtoken');
const usersModel = require('../model/usersModel');

// Mesma chave (privada) que usamos para criptografar o token é usada para descriptografá-lo.

require('dotenv/config');

const USER_KEY = 'agendadoida';

module.exports = async (req, res, next) => {
  // Aquele token gerado anteriormente virá na requisição através do
  // header Authorization em todas as rotas que queremos que sejam autenticadas.
  const token = req.headers.authorization;

  // Caso o token não seja informado, simplesmente retornamos
  // o código de status 401 - não autorizado.
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    // Através do método verify, podemos validar e decodificar o nosso JWT.
    const decoded = jwt.verify(token, USER_KEY);

    // Caso o token esteja expirado, o próprio JWT irá retornar um erro, por isso
    // não é necessário fazer validação
    // Caso esteja tudo certo, nós então buscamos o usuário na base para saber se esse token
    // não foi gerado através de alguma plataforma de gerador de JWT, por exemplo.
    const user = await usersModel.findById(decoded.data);

    // Não existe um usuário na nossa base com o id informado no token.
    if (!user) { return res.status(401).json({ message: 'jwt malformed' }); }

    // Se o usuário existe, colocamos ele em um campo no objeto res para que esteja disponível para
    // outros middlewares que executem em sequência ou para a callback que lida com a requisição.
    req.user = user;

    // Por fim, chamamos o próximo middleware que, no nosso caso, é a própria callback da rota.
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
