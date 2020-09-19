const usersService = require('./usersService');

const checkLogin = async (email, password) => {
  if (!email || !password) {
    return {
      cod: 401,
      error: true,
      message: 'All fields must be filled',
    };
  }

  const user = await usersService.getAllUsers()
    .then((res) => res.find((elem) => elem.email === email));

  if (!user || user.password !== password) {
    return {
      cod: 401,
      error: true,
      message: 'Incorrect username or password',
    };
  }

  return user;
};

module.exports = {
  checkLogin,
};
