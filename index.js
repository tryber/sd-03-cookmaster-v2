const express = require('express');
const bodyParser = require('body-parser');
const { loginController, recipeController } = require('./controllers');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/users', loginController);

app.use('/recipes', recipeController);

app.post('/login', loginController);

app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
