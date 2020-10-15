const bodyParser = require('body-parser');
const express = require('express');

const controllers = require('./controllers');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/', controllers.userController);

app.use('/recipes', authMiddleware, controllers.recipeController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Lintening on ${PORT}`); });
