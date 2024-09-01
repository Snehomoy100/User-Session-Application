const express = require('express');
const bodyParser = require('body-parser');
const useragent = require('express-useragent');
const { createUser, getUser, logoutUser } = require('./controllers/userController');

const app = express();

app.use(bodyParser.json());
app.use(useragent.express());

app.post('/create-user', createUser);
app.get('/get-user', getUser);
app.post('/logout', logoutUser);

module.exports = app;