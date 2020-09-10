const model = require('./modelUsers');
const { validateEntries, checkEmailExist } = require('../validation/validation');

const registerUsers = async (name, email, password, role) => {
  const validate = validateEntries(name, email, password);
  const checkEmail = await checkEmailExist(email);
  if (validate) return { validate };
  if (checkEmail) return { checkEmail };
  return model.registerUsers(name, email, password, role);
};

module.exports = {
  registerUsers,
};
