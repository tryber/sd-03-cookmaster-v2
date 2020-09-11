const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const { ErrorClass } = require('../utils/ErrorClass');
const { getUserByEmail, validateUserEmail } = require('../services/loginService');

const login = rescue(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ErrorClass(401, 'All fields must be filled', 'all_field_needed');
  }

  const emailIsValid = validateUserEmail(email);

  if (emailIsValid) {
    throw new ErrorClass(401, emailIsValid, 'email_not_valid');
  }

  const user = await getUserByEmail(email);

  if (!user) {
    throw new ErrorClass(401, 'Incorrect username or password', 'invalid_data');
  }
  // console.log(user)
  // const match = await bcrypt.compare(password, user.password); // Retorna true or false
  // console.log(match)
  if (password !== user.password) {
    throw new ErrorClass(401, 'Incorrect username or password', 'invalid_data');
  }

  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const secret = 'meuSegredoCriptografado';
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return res.status(200).json({ token });
});

module.exports = {
  login,
};
