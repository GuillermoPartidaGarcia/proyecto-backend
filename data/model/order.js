const { model } = require('mongoose');

const orderSchema = require('../schema/order');

const Order = model('Order', orderSchema);

module.exports = Order;