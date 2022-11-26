const { model } = require('mongoose');

const plannerSchema = require('../schema/planner');

const Comment = model('Planner', plannerSchema);

module.exports = Comment;
