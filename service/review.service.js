const { getProduct, changeProduct } = require('../data/controller/product');
const { getUser, changeUser } = require('../data/controller/user');
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

        const existing = await getReview({
          user: user._id,
          product: product._id,
        });
        if(existing){
          existing.value = value;
          await existing.save();
          return { code: 200, data: existing };
        }

        const data = await createReview({
            user: user._id,
            product: product._id,
            value,
        });

        await changeUser(
          {_id: user._id}, 
          {$push: { reviews: data._id }}
        );

        await changeProduct(
          {_id: product._id}, 
          {$push: { reviews: data._id }}
        );

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function myReview(userId, productId) {
  try {
      const product = await getProduct({ _id: productId });
      if (!product)
          return { code: 404, err: 'User not found' };

      const review = await getReview({user: userId});
      if (!review) 
        return {code: 200, data: { value: 0 } };

      const { value } = review;

      return { code: 200, data: { value } };
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
            { $group: { _id: '$_id', count: { $count: {} }, score: { $avg: '$value' } } }
        ]).exec();

        const [entry] = aggregateResult;

        const data = {
            ...entry,
            overallResponse: overallResponseString(entry.score),
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
    myReview,
    reviewFromProduct,
    reviewDelete
};
