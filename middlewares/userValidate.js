const { body, validationResult } = require('express-validator');
const {
  INVALID_USER_DATA,
  INVALID_LOGIN_DATA,
  errMessage,
} = require('../services/errorsServices');

const userValidate = (schemas, status) => async (req, res, next) => {
  await Promise.all(schemas.map((schema) => schema.run(req)));

  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  const errors = result.array();
  return res.status(status).send(errors[0].msg);
};

const userValidationRules = [
  body('email', errMessage(INVALID_USER_DATA)).notEmpty().isEmail(),
  body('name', errMessage(INVALID_USER_DATA)).exists(),
  body('password', errMessage(INVALID_USER_DATA)).exists(),
];

const loginValidationRules = [
  body('email', errMessage(INVALID_LOGIN_DATA)).exists().isEmail(),
  body('password', errMessage(INVALID_LOGIN_DATA)).exists(),
];

// const idValidationRules = [
//   param('id', errMessage('invalid_data', WRONG_ID)).isMongoId(),
// ];

// const idSaleRules = [
//   param('id', errMessage('invalid_data', WRONG_SALE_ID)).isMongoId(),
// ];

// const addSaleValidationRules = [
//   body().isArray(),
//   body('*.productId', errMessage('invalid_data', INVALID_ID_OR_QUANTITY)).isMongoId(),
//   body('*.quantity', errMessage('invalid_data', INVALID_ID_OR_QUANTITY)).isNumeric(),
//   body('*.quantity',
// errMessage('invalid_data', INVALID_ID_OR_QUANTITY)).custom((value) => value > 0),
// ];

module.exports = {
  userValidate: userValidate(userValidationRules, 400),
  loginValidate: userValidate(loginValidationRules, 401),
};
