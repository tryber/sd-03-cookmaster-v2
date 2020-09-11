const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const { loginController, recipeController, userController } = require('./controllers');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userController);

app.use('/recipes', recipeController);

app.post('/login', loginController);

app.listen(PORT, () => console.log(`Listen on ${PORT}`));

app.use(express.static(path.join(__dirname, 'uploads')));
