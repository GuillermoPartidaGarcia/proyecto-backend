const Review = require('../model/review');

const getReview = conditions => Review.findOne(conditions);

const getReviews = (conditions = {}) => Review.find(conditions);

const countReview = (conditions = {}) => Review.count(conditions);

const createReview = doc => Review.create(doc);

const changeReview = (conditions, doc) => Review.updateOne(conditions, doc);

const changeReviews = (conditions, doc) => Review.updateMany(conditions, doc);

const removeReview = conditions => Review.remove(conditions);

module.exports = {
    getReview,
    getReviews,
    countReview,
    createReview,
    changeReview,
    changeReviews,
    removeReview,
};
