const { Schema } = require('mongoose');
const { plannerState } = require('../enums/plannerState');

const plannerSchema = new Schema({
    date: { type: Schema.Types.Date },
    // refs
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    products: { type: [Schema.Types.ObjectId], ref: 'Product' },
    state: { type: Schema.Types.String, enum: Object.keys(plannerState).map(x => plannerState[x]) },
}, {
    timestamps: true,
});

module.exports = plannerSchema;
