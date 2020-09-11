const express = require('express');
const bodyParser = require('body-parser');
const controllerUser = require('./users/controllerUsers');

const app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => response.send());

app.post('/users', controllerUser);
app.post('/login', controllerUser);

app.listen(3000, () => console.log('Welcome 3000'));
