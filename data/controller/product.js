const Product = require('../model/product');

const getProduct = conditions => Product.findOne(conditions);

const getProducts = (conditions = {}) => Product.find(conditions);

const countProduct = (conditions = {}) => Product.count(conditions);

const createProduct = doc => Product.create(doc);

const changeProduct = (conditions, doc) => Product.updateOne(conditions, doc);

const changeProducts = (conditions, doc) => Product.updateMany(conditions, doc);

const removeProduct = conditions => Product.remove(conditions);

module.exports = {
    getProduct,
    getProducts,
    countProduct,
    createProduct,
    changeProduct,
    changeProducts,
    removeProduct,
};
