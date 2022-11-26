const { model } = require('mongoose');

const reviewSchema = require('../schema/review');

const Review = model('Review', reviewSchema);

module.exports = Review;