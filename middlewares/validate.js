const { verifyToken } = require('../services/jwt');
const { user, login, recipes } = require('../services/Validators');
const Err = require('../services/Error');

const err = new Err();

function validateToken(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) return next(err.noauth);
    const isValidToken = verifyToken(authorization);
    if (!isValidToken) {
      return next(err.invalidToken);
    }
    return next();
  } catch (e) {
    return next(err.invalidToken);
  }
}

module.exports = { user, login, validateToken, recipes };
