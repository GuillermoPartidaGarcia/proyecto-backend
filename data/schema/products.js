const { Schema } = require('mongoose');

const productSchema = new Schema({
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: true },
    price: { type: Schema.Types.Number, required: true },
    tags: { type: [Schema.Types.String], required: true },
    // refs
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    media: {
        type: [Schema.Types.ObjectId],
        ref: 'Media',
        // validate: v => Array.isArray(v) && v.length > 0,
    },
    comments: { type: [Schema.Types.ObjectId], ref: 'Comment', },
    orders: { type: [Schema.Types.ObjectId], ref: 'Order' },
});

productSchema.index({ name: 'text', tags: 'text' });

module.exports = productSchema;
