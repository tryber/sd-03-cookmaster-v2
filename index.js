const express = require('express');
const bodyParser = require('body-parser');
const { login, users, recipes } = require('./controllers');

// Toda a estrutura e partes do código foram baseados no código da gomesAnaC
// https://github.com/tryber/sd-03-cookmaster-v2/tree/gomesanac-sd-03-cookmaster-v2

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/users', users);
app.use('/recipes', recipes);

app.post('/login', login);

app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
