const { datatype } = require('faker');
const userService = require('./user.service');
const productService = require('./product.service');
const { getProduct } = require('../data/controller/product');
const { getUser } = require('../data/controller/user');
const { createReview, getReviews } = require('../data/controller/review');
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
    // get user and product review
    const { code: userCode, err: userErr, data: user } = await userService.userFind(datatype.uuid());
    if (userErr)
        return { code: userCode, err: userErr };

    const { code: productCode, err: productErr, data: product } = await productService.productFind(datatype.uuid());
    if (productErr)
        return { code: productCode, err: productErr };

    try {
        const data = {
            id: datatype.uuid(),
            user,
            product,
            value: Math.floor(Math.random() * 4) + 1,
        };

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
