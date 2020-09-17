const usersModel = require('../model/usersModel');
// const productModel = require('../model/productModel');

const errGeneric = {
  code: 400,
  message: 'Invalid entries. Try again.',
};

const errPrivilege = {
  code: 403,
  message: 'Only admins can register new admins',
};

const errConflict = {
  code: 409,
  message: 'Email already registered',
};

const incompleteDataError = { code: 401, message: 'All fields must be filled' };
const invalidUserError = { code: 401, message: 'Incorrect username or password' };

const checkAndInsert = async (user, currUserRole, newUserRole) => {
  const { name, email, password } = user;
  const hasEmail = await usersModel.findByEmail(email);

  // Única situação em que um user tenta criar um admin
  if (currUserRole != newUserRole) return errPrivilege;
  if ( // RegEx obtido em regexr.com
    !(/([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm).test(email)
    || !name
    || !password
  ) {
    return errGeneric;
  }
  if (hasEmail) return errConflict;
  return usersModel.insertUser(user, currUserRole, newUserRole);
};

const selectOne = async (loginData) => {
  const { email, password } = loginData;
  if (!email || !password) return incompleteDataError;

  const user = await usersModel.findByEmail(loginData.email);

  if(!user) return invalidUserError;
  // Usuário inexistente ou senha incorreta retornam o mesmo erro
  
  return loginData.password === user.password
  ? { code: 200, user }
  : invalidUserError;
};

module.exports = {
  checkAndInsert,
  selectOne,
};
