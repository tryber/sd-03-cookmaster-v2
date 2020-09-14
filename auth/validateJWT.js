const jwt = require('jsonwebtoken');
const model = require('../model/model');

const segredo = 'cookmaster_v2';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    // Através o método verify, podemos validar e decodificar o nosso JWT.
    const decoded = jwt.verify(token, segredo);
    const user = await model.getUserByEmail(decoded.data[1]);

    // Não existe um usuário na nossa base com o email informado no token.
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuario do token.' });
    }

    // O usuário existe! Colocamos ele em um campo no objeto res.
    // Dessa forma, o usuário estará disponível para outros middlewares que
    // executem em sequência ou para a callback que lida com a requisição.
    req.user = user;

    // Por fim, chamamos o próximo middleware que, no nosso caso,
    // é a própria callback da rota.
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
