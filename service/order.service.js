const { getUser } = require('../data/controller/user');
const { getProduct } = require('../data/controller/product');
const { createOrder, getOrder, getOrders } = require('../data/controller/order');

async function orderCreate(userid, productid, quantity){
    try {
        const product = await getProduct({_id: productid });
        if(product===null)
            return { code: 404, err: 'Product not found' };
        const user = await getUser({_id: userid });
        if(user===null)
            return { code: 404, err: 'User not found' };

        const data = await createOrder({
            user: user._id, 
            product: product._id,
            quantity,
            total: product.price * quantity
        });

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function orderFind(id){
    try {
        const data = await getOrder({ _id : id });
        if (data===null) 
            return { code: 404, err: 'Order not found' };

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function orderAll(){
    try {
        const data = await getOrders({});
        if (data.length===0)
            return { code: 404, err: 'No orders found' };

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function orderFromUser(userid){
    try {
        const user = await getUser({ _id: userid }).populate('orders');
        if (user===null) 
            return { code: 404, err: 'User not found' };
        
        const data = user.orders;
        if (data.length===0)
            return { code: 404, err: 'No orders found' };

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}


module.exports = {
    orderCreate,
    orderFind,
    orderAll,
    orderFromUser,
};
