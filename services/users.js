const { usersModel } = require('../models');

/**
 * retorna o usuário completo do banco
 * @param {string} role "user" ou "admin"
 * @param {Object} param1 objeto com nome, email e senha do usuário
 */
const createUser = async (role, { name, email, password }) =>
  usersModel.add({ name, email, password, role });

/**
 * retorna o primeiro user encontrado ou null
 * @param {object} userObj contém qualquer propriedade de um user
 */
const getUserByEmail = async (email) => usersModel.getUser({ email });

const validateLogin = async (email, password) =>
  usersModel.getUser({ email })
    .then((user) => {
      const errorObj = { error: true, message: 'Incorrect username or password' };
      if (!user || user.password !== password) return errorObj;
      return user;
    });

module.exports = {
  getUserByEmail,
  createUser,
  validateLogin,
};
