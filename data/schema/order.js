const { Schema } = require('mongoose');

const orderSchema = new Schema({
    quantity: { type: Schema.Types.Number, required: true },
    total: { type: Schema.Types.Number, required: true },
    // refs
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
});

module.exports = orderSchema;
