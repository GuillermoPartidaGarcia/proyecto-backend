const Order = require('../model/order');

const getOrder = conditions => Order.findOne(conditions);

const getOrders = (conditions = {}) => Order.find(conditions);

const countOrder = (conditions = {}) => Order.count(conditions);

const createOrder = doc => Order.create(doc);

const changeOrder = (conditions, doc) => Order.updateOne(conditions, doc);

const changeOrders = (conditions, doc) => Order.updateMany(conditions, doc);

const removeOrder = conditions => Order.remove(conditions);

module.exports = {
    getOrder,
    getOrders,
    countOrder,
    createOrder,
    changeOrder,
    changeOrders,
    removeOrder,
};
