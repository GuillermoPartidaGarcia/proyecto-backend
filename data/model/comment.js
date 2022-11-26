const { model } = require('mongoose');

const commentSchema = require('../schema/comments');

const Comment = model('Comment', commentSchema);

module.exports = Comment;