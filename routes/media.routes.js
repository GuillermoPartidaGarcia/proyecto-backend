const express = require('express');
const app = express();
const mediaController = require('../controller/media.controller');

app.get('/media-read/:id', mediaController.imageRead)

module.exports = app;
