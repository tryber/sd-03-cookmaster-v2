const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const usersControllers = require('./controllers/usersControllers');
const loginControllers = require('./controllers/loginControllers');
const recipesControllers = require('./controllers/recipesControllers');

const app = express();

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', usersControllers);

app.use('/login', loginControllers);

app.use('/recipes', recipesControllers);

app.use('/images', express.static(path.join(__dirname, 'uploads')));

const PORT = 3000;

app.listen(PORT, () => { console.log(`Listening on ${PORT}`); });
