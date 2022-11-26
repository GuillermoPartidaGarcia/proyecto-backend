const Comment = require('../model/comment');

const getComment = conditions => Comment.findOne(conditions);

const getComments = (conditions = {}) => Comment.find(conditions);

const countComment = (conditions = {}) => Comment.count(conditions);

const createComment = doc => Comment.create(doc);

const changeComment = (conditions, doc) => Comment.updateOne(conditions, doc);

const changeComments = (conditions, doc) => Comment.updateMany(conditions, doc);

const removeComment = conditions => Comment.remove(conditions);

module.exports = {
    getComment,
    getComments,
    countComment,
    createComment,
    changeComment,
    changeComments,
    removeComment,
};
