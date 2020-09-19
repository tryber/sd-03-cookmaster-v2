const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const secret = 'xablaublaxablau';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const { _id } = decoded.data;

    const user = await usersModel.getUserById(_id);

    // console.log('aqui');
    // console.log(user);
    // console.log('depois');

    if (!user) {
      return res.status(401).json({ message: 'missing auth token' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
