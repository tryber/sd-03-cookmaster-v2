/* Regex obtido em
https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address */
const validateEmail = (email = '') =>
  email
  && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );

/* Função de comparação de Objetos, fonte:
https://dmitripavlutin.com/how-to-compare-objects-in-javascript/  */
const shallowComparation = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  return !keys1.some((key) => object1[key] !== object2[key]);
};

function generateError(status, error) {
  return {
    status,
    payload: { message: error.message },
  };
}

module.exports = { generateError, validateEmail, shallowComparation };
