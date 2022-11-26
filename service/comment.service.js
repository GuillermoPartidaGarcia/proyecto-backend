const { lorem, datatype } = require('faker');
const userService = require('./user.service');
const productService = require('./product.service');
const { getUser } = require('../data/controller/user');
const { getProduct } = require('../data/controller/product');
const { createComment, getComment, getComments } = require('../data/controller/comment');

async function commentCreate(userid, productid, content) {
    try {
        const user = await getUser({ _id: userid });
        if (!user)
            return { code: 404, err: 'User not found' };

        const product = await getProduct({ _id: productid });
        if (!product)
            return { code: 404, err: 'Product not found' };

        const data = await createComment({
            user: user._id,
            product: product._id,
            content
        });

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function commentFind(id) {
    try {
        const comment = await getComment({ _id: id }).populate(['user', 'product']);
        return { code: 200, data: comment };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function commentFromProduct(productId) {
    try {
        const product = await getProduct({ _id: productId });
        if (!product)
            return { code: 404, err: 'Product not found' };

        const comments = await getComments({ product: product._id }).populate(['user', 'product']);

        return { code: 200, data: comments };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function commentFromUser(userId) {
    try {
        const user = await getUser({ _id: userId });
        if (!user)
            return { code: 404, err: 'User not found' };

        const comments = await getComments({ user: user._id }).populate(['user', 'product']);

        return { code: 200, data: comments };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function commentUpdate(id, content) {
    try {
        const comment = await getComment({ _id: id }).populate(['user', 'product']);
        if (!comment)
            return { code: 404, err: 'Comment not found' };

        comment.content = content;
        await comment.save()

        return { code: 200, data: comment };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function commentDelete(id) {
    try {
        const comment = await getComment({ _id: id }).populate(['user', 'product']);
        if (!comment)
            return { code: 404, err: 'Comment not found' };

        await commentDelete({ _id: comment._id });

        return { code: 200 };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}


module.exports = {
    commentCreate,
    commentFind,
    commentFromProduct,
    commentFromUser,
    commentUpdate,
    commentDelete
};
