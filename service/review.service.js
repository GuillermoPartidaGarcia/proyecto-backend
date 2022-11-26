const { getProduct } = require('../data/controller/product');
const { getUser } = require('../data/controller/user');
const { createReview, getReviews, getReview } = require('../data/controller/review');
const Review = require('../data/model/review');

async function reviewCreateOrUpdate(productId, userId, value) {
    try {
        const product = await getProduct({ _id: productId });
        if (!product)
            return { code: 404, err: 'Product not found' };

        const user = await getUser({ _id: userId });
        if (!user)
            return { code: 404, err: 'User not found' };

        const data = await createReview({
            user: user._id,
            product: product._id,
            value,
        });

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

function overallResponseString(score) {
    if (score >= 4)
        return 'amazing!';
    else if (score >= 3)
        return 'good';
    else if (score >= 2)
        return 'medium';
    return 'poor';
}
async function reviewFromProduct(productId) {
    try {
        const product = await getProduct({ _id: productId });
        if (!product)
            return { code: 404, err: 'User not found' };

        const aggregateResult = await Review.aggregate([
            { $match: { product: product._id } },
            { $group: { count: { $count: '$_id' }, score: { $avg: '$value' } } }
        ]).exec();

        const data = {
            ...aggregateResult,
            overallResponse: overallResponseString(aggregateResult.score),
        };

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function reviewDelete(id) {
    try {
        const data = await getReview({_id: id}).populate('user').populate('product');
        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

module.exports = {
    reviewCreateOrUpdate,
    reviewFromProduct,
    reviewDelete
};
