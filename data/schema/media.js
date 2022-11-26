const { Schema } = require('mongoose');

const mediaSchema = new Schema({
    mime: { type: Schema.Types.String },
    data: { type: Schema.Types.Buffer },
    URL: { type: Schema.Types.String },
    isURL: { type: Schema.Types.String, required: true },
});

module.exports = mediaSchema;
