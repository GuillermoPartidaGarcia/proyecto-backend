const express = require('express');
const app = express();
const orderController = require('../controller/order.controller');

app.post('/order-create', orderController.orderCreate);
app.get('/order-read/:id', orderController.orderRead);
app.get('/order-readAll', orderController.orderReadAll);
app.get('/order-fromUser', orderController.orderFromUser);

module.exports = app;
