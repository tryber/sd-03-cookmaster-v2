const express = require('express');
const bodyParse = require('body-parser');
const user = require('./controllers/userController');

const app = express();

app.use(bodyParse.json());

app.post('/users', user.createUser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});
