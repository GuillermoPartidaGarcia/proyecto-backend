const { getProduct, getProducts } = require('../data/controller/product');
const { getUser, changeUser } = require('../data/controller/user');
const { createPlanner, getPlanner } = require('../data/controller/planner');
const { plannerState } = require('../data/enums/plannerState');

const productMediaToURL = product => 
  product.media.map( media => `/media-read/${media._id}`);

async function plannerCreate(userid, date, productids = []) {
    try {
        const products = await getProducts({ _id: { $in: productids } });

        const user = await getUser({ _id: userid });
        if (!user)
            return { code: 404, err: 'User not found' };

        const planner = await getPlanner({user: user._id}).populate('products');

        if (planner) 
          return { code: 200, data: {
            ...planner.toObject(), 
            products: planner.products.map(product => ({
              ...product.toObject(), 
              media: productMediaToURL(product)
            }))
          }};

        const data = await createPlanner({
            products: products.map(x => x._id),
            user: user._id,
            date,
            state: plannerState.inProgress,
        })

        await changeUser(
          { _id: user._id }, 
          { $set:{ planner: data._id } }
        );

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function plannerFind(id) {
    try {
        const data =
            await getPlanner({ _id: id }).populate('products');

        return { code: 200, data: { ...data, products } };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function plannerAddProduct(id, productid) {
    try {
        const product = await getProduct({ _id: productid });
        if (!product)
            return { code: 404, err: 'Product not found' };

        const planner = await getPlanner({ _id: id }).populate('products');
        if (!planner)
            return { code: 404, err: 'Planner not found' };

        if (planner.products.indexOf(product.id) !== -1)
            return { code: 400, err: 'Product is already in planner' };

        planner.products = [...planner.products, product.id];
        await planner.save();

        return { code: 200, data: planner };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function plannerRemoveProduct(id, productid) {
    try {
        const product = await getProduct({ _id: id });
        if (!product)
            return { code: 404, err: 'Product not found' };

        const planner = await getPlanner({ _id: id });
        if (!planner)
            return { code: 404, err: 'Planner not found' };

        if (planner.products.indexOf(product.id) === -1)
            return { code: 400, err: 'Product is not in planner' };

        planner.products = planner.products.filter(id => id !== productid);
        await planner.save();

        return { code: 200, data: planner };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function plannerReschedule(id, date) {
    try {
        const planner = await getPlanner({ _id: id }).populate(['user', 'products']);
        if (!planner)
            return { code: 404, err: 'Planner not found' };

        planner.date = date;
        await planner.save();

        return { code: 200, data: planner };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function plannerBuy(id) {
    try {
        const planner = await getPlanner({ _id: id }).populate(['user', 'products']);
        if (!planner)
            return { code: 404, err: 'Planner not found' };

        planner.state = plannerState.Bought;
        planner.save();

        return { code: 200, data: planner };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function plannerDelete(id) {
    try {
        const planner = await getPlanner({ _id: id }).populate(['user', 'products']);
        if (!planner)
            return { code: 404, err: 'Planner not found' };

        // soft delete
        // potentially analyze tendencies for customized ads or suggestions
        // might sell data
        planner.state = plannerState.Canceled;
        planner.save();

        return { code: 200, data: planner };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

module.exports = {
    plannerCreate,
    plannerFind,
    plannerAddProduct,
    plannerRemoveProduct,
    plannerReschedule,
    plannerBuy,
    plannerDelete,
};
