const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { loginController, recipeController, userController } = require('./controllers');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'images')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userController);

app.use('/recipes', recipeController);

app.post('/login', loginController);

app.listen(PORT, () => console.log(`Listen on ${PORT}`));
