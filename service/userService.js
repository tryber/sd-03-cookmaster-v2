const usersModel = require('../model/usersModel');
// const productModel = require('../model/productModel');

const getById = async (id) => usersModel.findById(id);

const errGeneric = {
  code: 400,
  message: 'Invalid entries. Try again.' 
}

const errConflict = {
  code: 409,
  message: 'Email already registered' 
}

const incompleteDataError = { code: 401, message: 'All fields must be filled' };
const invalidUserError = { code: 401, message: 'Incorrect username or password' };

const checkUserData = async (user) => {
  const { name, email, password } = user;

  const hasEmail = await usersModel.findByEmail(email);
  if ( // RegEx obtido em regexr.com
    !(/([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm).test(email)
    || !name
    || !password
  )
    return errGeneric;
  if (hasEmail.length > 0) return errConflict
  return usersModel.insert( user );
}

const selectOne = async (loginData) => {
  const { email, password } = loginData;
  if ( !email || !password ) return incompleteDataError;

  const user = await usersModel.findByEmail(loginData.email);
  // Usuário inexistente ou senha incorreta retornam o mesmo erro

  return loginData.password === user[0].password
  ? { code: 200, user }
  : invalidUserError;
}

module.exports = {
  checkUserData,
  selectOne,
  getById,
};
