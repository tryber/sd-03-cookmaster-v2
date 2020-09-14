const jwt = require('jsonwebtoken');
const usersModel = require('../users/usersModel');

const segredo = 'seusecretdetoken';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const { data: { _id } } = jwt.verify(token, segredo);
    const user = await usersModel.getUserById(_id);
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuario do token.' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
