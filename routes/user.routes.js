const express = require('express');
const app = express();
const userController = require('../controller/user.controller');

// CRUD
app.post('/user-create', userController.userCreate);
app.get('/user-read/:id', userController.userRead);
app.get('/user-readAll', userController.userReadAll);
app.put('/user-update/:id', userController.userUpdate);
app.delete('/user-delete/:id', userController.userDelete);
// Search
app.get('/user-search', userController.userSearch);
// Auth
app.post('/login', userController.login);
app.get('/me', userController.me);

module.exports = app;
