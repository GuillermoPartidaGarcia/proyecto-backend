const express = require('express');
const app = express();
const reviewController = require('../controller/review.controller');

app.post('/review-create', reviewController.reviewCreateOrUpdate);
app.get('/review-product/:id', reviewController.reviewFromProduct);
app.delete('/review-delete/:id', reviewController.reviewDelete);

module.exports = app;
