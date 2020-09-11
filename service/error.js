const messages = {
  1: 'Invalid entries. Try again.',
  2: 'Email already registered',
};

const codes = {
  400: '400',
  409: '409',
};

const emailTest = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const validateNewUser = (name, email, password) => {
  if (!name || !email || !password) return { code: codes[400], message: messages[1] };

  //* Valida o e-mail:

  const validEmail = emailTest.test(email);
  if (!validEmail) return { code: codes[400], message: messages[1] };

  //* Passando nas validações retorna nullish
  return 'passou';
};

module.exports = {
  messages,
  codes,
  validateNewUser,
};
