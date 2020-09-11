const jwt = require('jsonwebtoken');

const services = require('../../services');
const { tokenKey } = require('../login/loginConfig');
const { generateError } = require('../../utils');

const validateTokenInfo = async (token) => {
  try {
    const decodedInfo = jwt.verify(token, tokenKey);
    const { _id } = decodedInfo.data;

    const userData = await services.SearchUser(null, _id);

    if (!userData) return null;

    return { ...userData };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = (required = true) => async (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization;
    const validateInfo = await validateTokenInfo(token);

    if (!required && !token) next();

    if ((required && !token) || !validateInfo) throw new Error('invalid token');

    req.user = validateInfo;

    return next();
  } catch (error) {
    return next(generateError(401, error));
  }
};
