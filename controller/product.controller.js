const productService = require('../service/product.service');

function validateProductCreate(name, description, price, userId, tags) {
    if (!name || name.length === 0)
        return 'product name mandatory, must not be empty';

    if (!price && typeof price !== 'number')
        return 'product price mandatory, must be a number';

    if (!description || description.length === 0)
        return 'product description mandatory, must not be empty';

    if (!userId)
        return 'userid mandatory, must not be empty';

  return null;
}
async function productCreate(req, res) {
    const { name, price, description, tags } = req.body;
    const { user } = req;

    if (!user) {
        return res.status(401).send('UNAUTHORIZED');
    }

    const { _id: userId } = req.user;

    const userErr = validateProductCreate(name, description, price, userId, tags);
    if (userErr)
        return res.status(400).send(userErr);

    const filteredTags = tags.split(' ').filter(tag => tag.length);
    const { code, err, data } =
        await productService.productCreate(userId, name, description, price, filteredTags, [...req.files]);
    if (err)
        return res.status(code).send(err);

    return res.status(200).json(data);
}

function validateProductRead(id) {
    return !id ? 'Id mandatory, must not be empty' : null;
}
async function productRead(req, res) {
    const { id } = req.params;

    const userErr = validateProductRead(id);
    if (userErr)
        return res.status(400).send(userErr);

    const { code, err, data } = await productService.productFind(id);
    if (err)
        return res.status(code).send(err);

    return res.status(200).json(data);
}

async function productReadAll(req, res) {
    const { code, err, data } = await productService.productAll();
    if (err)
        return res.status(code).send(err);

    return res.status(200).json(data);
}

function validateProductUpdate(id, body, userId) {
    if (!id || id.length === 0)
        return 'Id mandatory, must not be empty';

    if (!body || Object.keys(body).length === 0)
        return 'Must update at least one field';

    if (!userId)
        return 'Userid mandatory, must not be empty';

    return null;
}
async function productUpdate(req, res) {
    const { body, params: { id } } = req;
    const { _id: userId } = req.user;

    const userErr = validateProductUpdate(id, body, userId);
    if (userErr)
        return res.status(400).send(userErr);

    const { code, err, data } = await productService.productUpdate(userId, id, body);
    if (err)
        return res.status(code).send(err);

    return res.status(200).json(data);
}

function validateProductDelete(id) {
    return !id ? 'Id mandatory, must not be empty' : null;
}
async function productDelete(req, res) {
    const { id } = req.params;
    const userErr = validateProductDelete(id);
    if (userErr)
        return res.status(400).send(userErr);

    const { code, err, data } = await productService.productDelete(id);
    if (err)
        return res.status(code).send(err);

    return res.status(200).json(data);
}

async function productSearch(req, res) {
    const { query } = req.query;

    const { code, err, data } = await productService.productSearch(query);
    if (err)
        return res.status(code).send(err);

    return res.status(200).json(data);
}

module.exports = {
    productCreate,
    productRead,
    productReadAll,
    productUpdate,
    productDelete,

    productSearch,
};