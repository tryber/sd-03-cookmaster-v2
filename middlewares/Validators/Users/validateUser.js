const Validator = require('validatorjs');
const newUserValidationRules = require('./userModel');
const { findUser } = require('../../../users/userModel');

const validateUserModel = (req, res, next) => {
  const validate = new Validator(req.body, newUserValidationRules);
  console.log(validate.errors);
  if (validate.passes() === true) {
    console.log('passssssssssoooooooooooooooooou');
    next();
  }
  if (findUser(req.body.email, 'email')) {
    return res.json({ message: 'Email already registered' }).status(409);
  }
  console.log(validate.errors.Errors.email);
  if (validate.errors.Errors) {
    return res.json({ message: 'Invalid entries. Try again.' }).status(400);
  }
};

module.exports = validateUserModel;
