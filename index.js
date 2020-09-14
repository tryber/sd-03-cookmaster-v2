const express = require('express');
const bodyParser = require('body-parser');
const { loginController, recipeController, userController } = require('./controllers');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userController);

app.use('/recipes', recipeController);

app.post('/login', loginController);

const PORT = 3000;
app.listen(PORT, () => console.log(`Listen on ${PORT}`));
