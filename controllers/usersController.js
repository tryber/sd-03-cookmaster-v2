const rescue = require('express-rescue');
// const bcrypt = require('bcrypt');
const { ErrorClass } = require('../utils/ErrorClass');
const {
  insertCommonUser,
  validateName,
  validatePassword,
  validateUserEmail,
  validateUniqueEmail,
  createNewAdmin,
} = require('../services/userServices');

const createUser = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const nameIsValid = validateName(name);
  const passwordIsValid = validatePassword(password);
  const emailIsValid = validateUserEmail(email);
  const uniqueEmail = await validateUniqueEmail(email);

  if (nameIsValid || passwordIsValid || emailIsValid) {
    const errorMessage = nameIsValid || passwordIsValid || emailIsValid;
    throw new ErrorClass(400, errorMessage, 'invalid_data');
  }

  if (uniqueEmail) throw new ErrorClass(409, uniqueEmail, 'not_unique_email');

  // const saltRounds = 10;
  // const hashPassword = await bcrypt.hash(password, saltRounds);

  const user = await insertCommonUser({ name, email, password, role: 'user' });

  return res.status(201).json({ user });
});

const createAdmin = rescue(async (req, res) => {
  const { role } = req.user;
  const { name, email, password } = req.body;

  if (role !== 'admin') {
    throw new ErrorClass(403, 'Only admins can register new admins', 'not_admin');
  }

  const createAdminUser = await createNewAdmin({ name, email, password, newUserRole: 'admin' });
  return res.status(201).json(createAdminUser);
});

module.exports = {
  createUser,
  createAdmin,
};
