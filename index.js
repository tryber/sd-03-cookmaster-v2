const express = require('express');
const bodyParse = require('body-parser');
const userController = require('./controllers/userController');
const recipesController = require('./controllers/recipesController');

const app = express();

app.use(bodyParse.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/', userController);
app.use('/recipes', recipesController);

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});
