const userModel = require('../models/userModel');
const { generateJwt } = require('../middlewares/auth');

// Referência regex para validação de email:
// https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
const regexEmail = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const userLogin = async (email, password) => {
  if (!email || !password) return { message: 'All fields must be filled' };

  const user = await userModel.findByEmail(email);
  if (!user || user.password !== password) return { message: 'Incorrect username or password' };
  return generateJwt(user);
};

/* const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
}; */

const registerUser = async (name, email, password) => {
  if (!name || !email || !regexEmail.test(email) || !password) {
    return { code: 'invalid_data', message: 'Invalid entries. Try again.' };
  }

  const isEmailAlreadyRegistered = await userModel.findByEmail(email);

  if (isEmailAlreadyRegistered) {
    return { code: 'conflict', message: 'Email already registered' };
  }

  const registeredUser = await userModel.registerUser(name, email, password);

  return registeredUser;
};

/* const editUser = async (req, res) => {
  const { email, password, name, lastName } = req.body;

  await userModel.editUser(req.user.id, email, password, name, lastName);

  return res.redirect('/');
};
 */
module.exports = {
  registerUser,
  userLogin,
};
