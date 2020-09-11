/* Regex obtido em
https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address */
const validateEmail = (email = '') =>
  email
  && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );

const generateError = (status, error) => ({
  status,
  payload: { message: error.message },
});

module.exports = { generateError, validateEmail };
