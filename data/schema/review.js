const { Schema } = require('mongoose');

const reviewSchema = new Schema({
    value: { type: Schema.Types.Number, required: true },
    // refs
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
});

module.exports = reviewSchema;
