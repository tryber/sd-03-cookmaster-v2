const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

const stream = fs.createReadStream('./uploads/jacquinho.jpg');

const form = new FormData();
form.append('image', stream);

const formHeaders = form.getHeaders();

axios
  .put('http://localhost:3000/recipes/5f5e56861c7e7d051a7200b5/image', form, {
    headers: {
      ...formHeaders,
    },
  })
  .then(() => console.log('Salvo com Sucesso!'))
  .catch((error) => console.log(error));
