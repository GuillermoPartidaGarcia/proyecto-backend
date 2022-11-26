const { model } = require('mongoose');

const productSchema = require('../schema/products');

const Product = model('Product', productSchema);

module.exports = Product;