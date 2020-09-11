const { getUserByEmail } = require('../models/usersModel');

const verifyEmail = (email) => {
  if (typeof email !== 'string') return false;
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const validation = regex.test(email);
  if (!validation) return false;
  return true;
};

const verifyEmailUnicity = async (email) => {
  const user = await getUserByEmail(email);
  if (user !== null) return false;
  return true;
};

const verifyUser = async (data) => {
  const { email, name, password } = data;

  if (!email || !name || !password) {
    return {
      error: { code: 'invalid_data', message: 'Invalid entries. Try again.' },
    };
  }

  if (!verifyEmail(email)) {
    return {
      error: { code: 'invalid_data', message: 'Invalid entries. Try again.' },
    };
  }
  const emailUnicity = await verifyEmailUnicity(email);
  if (!emailUnicity) {
    return {
      error: { code: 'invalid_data', message: 'Email already registered' },
    };
  }

  return true;
};

module.exports = {
  verifyUser,
};
