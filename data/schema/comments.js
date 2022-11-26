const { Schema } = require('mongoose');

const commentSchema = new Schema({
    content: { 
        type: Schema.Types.String, 
        validate: v => typeof v === 'string' && v.length > 0,
    },
    // refs
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
},{
    timestamps: true,
});

module.exports = commentSchema;
