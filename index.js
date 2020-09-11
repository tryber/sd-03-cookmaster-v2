const express = require('express');
const bodyParser = require('body-parser');
const { usersController } = require('./controllers');

const app = express();

app.use(bodyParser.json());

const PORT = 3000;

app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', usersController.newUser);
