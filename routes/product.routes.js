const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer();
const productController = require('../controller/product.controller');

app.post('/product-create', upload.any('images'), productController.productCreate);
app.get('/product-read/:id', productController.productRead);
app.get('/product-readAll', productController.productReadAll);
app.put('/product-update/:id', upload.any('images'), productController.productUpdate);
app.delete('/product-delete/:id', productController.productDelete);

app.get('/product-search', productController.productSearch);

module.exports = app;
