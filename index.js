require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');

const { userRoute, loginRoute, recipeRoute } = require('./routes');
const { errorHandler } = require('./middlewares');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/users', userRoute);
app.use('/login', loginRoute);
app.use('/recipes', recipeRoute);

app.listen(PORT, () => {
  console.log('Running...');
});

app.use(errorHandler);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
