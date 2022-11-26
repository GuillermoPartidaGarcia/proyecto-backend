const { createMedia } = require('../data/controller/media');
const { createProduct, getProduct, getProducts } = require('../data/controller/product');
const { getUser } = require('../data/controller/user');


const productMediaToURL = product => 
  product.media.map( media => `/media-read/${media._id}`);

async function productCreate(userId, name, description, price, tags, files = []) {
    try {
        const user = await getUser({ _id: userId });
        if (user === null)
            return { code: 404, err: 'User not found' };

        // upload media if any
        const fileUploads = await Promise.allSettled(
            files.map(
                file => createMedia({ mime: file.mimetype, data: file.buffer, isURL: false })
            ),
        );

        // filtrar solo las imagenes que se pudieron subir adecuadamente
        const media = fileUploads
            .filter(upload => upload.status === 'fulfilled')
            .map(upload => upload.value._id);

        if (media.length === 0)
            return { code: 500, err: 'Error uploading media' };

        const product = await createProduct({
            user: user._id,
            name,
            description,
            price,
            tags,
            media
        });

        if (media.length !== fileUploads.length)
            return { code: 200, data: { ...product.toJSON(), err: 'Error uploading some files' } };

        return { 
          code: 200, 
          data: {
            ...product.toObject(), 
            media: productMediaToURL(product)
          } 
        };

    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function productFind(id) {
    try {
        const product = await getProduct({ _id: id });
        if (product === null)
            return { code: 404, err: 'Product not found' };

        return { 
          code: 200, 
          data: {
            ...product.toObject(), 
            media: productMediaToURL(product)
          } 
        };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function productFindMultiple(...ids) {
    try {
        let products = await getProducts({ _id: { $in: ids } }).populate('media');
        if (products.length === 0)
            return { code: 404, err: 'No products found' };

        return { 
          code: 200, 
          data: 
            products.map(product => ({
              ...product.toObject(), 
              media: productMediaToURL(product)
            })) 
        };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function productAll() {
    try {
        const products = await getProducts({}).populate('media');
        if (products.length === 0)
            return { code: 404, err: 'No products found' };

        return { 
          code: 200,
          data: 
            products.map(product => ({
              ...product.toObject(), 
              media: productMediaToURL(product)
            })) 
        };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function productUpdate(userid, id, updatedData) {
    try {
        const product = await getProduct({ _id: id });
        if (product === null)
            return { code: 404, err: 'Product not found' };
        if (product.user !== userid)
            return { code: 403, err: 'Product must belong to editing user' };

        Object.keys(updateData).forEach(key => product[key] = updatedData[key]);
        product.save();

        return { code: 200 };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function productDelete(id) {
    try {
        const product = await getProduct({ _id: id });
        if (product === null)
            return { code: 404, err: 'Product not found' };

        await removeUser({ _id: id });

        return { code: 200 };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function productSearch(query) {
    try {
        // const products = await getProducts({ $text: { $search: query } }).populate('media');
        let products = await getProducts( 
          { $or: [
            {tags: { $regex: query || '' }},
            {name: { $regex: query || '' }},
          ]}).populate('media');

        if (products.length === 0)
            return { code: 404, err: 'No products found' };

        products = products.map(product => {
          const media = product.media.map(
            mediaEntry => `/media-read/${mediaEntry._id.toString()}`
          );

          return {
            ...product.toObject(), 
            media
          };
        });

        return { code: 200, data: products };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

module.exports = {
    productCreate,
    productFind,
    productFindMultiple,
    productAll,
    productUpdate,
    productDelete,

    productSearch,
};
