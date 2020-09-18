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

const verifyUser = async (req, res, next) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (!verifyEmail(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const emailUnicity = await verifyEmailUnicity(email);
  if (!emailUnicity) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  return next();
};

module.exports = verifyUser;
