const jwt = require('jsonwebtoken');
const { name, internet, image, datatype } = require('faker');
const userService = require('../service/user.service');

// CRUD

function validateUserCreate(username, email, name, password, type) {
    if (!username || username.length === 0)
        return 'username mandatory, must not be empty';

    if (!email || email.length === 0)
        return 'email mandatory, must not be empty';

    if (!name || name.length === 0)
        return 'name mandatory, must not be empty';

    if (!password || password.length === 0)
        return 'password mandatory, must not be empty';

    if (!type || type.lenght === 0)
        return 'type mandatory, must not be empty';

    return null;
}
async function userCreate(req, res) {
    const { username, email, name, password, type } = req.body;

    const userErr =
        validateUserCreate(username, email, name, password, type);

    if (userErr)
        return res.status(400).send(userErr);

    const { code, err, data } =
        await userService.userCreate(username, email, name, password, type);

    if (err)
        return res.status(code).send(err);

    return res.status(code).json(data);
}

function validateUserRead(id) {
    return !id || id.length === 0 ? 'Path must have an id for the user' : null;
}
async function userRead(req, res) {
    const { id } = req.params;

    const userErr = validateUserRead(id);
    if (userErr)
        return res.status(400).send(userErr);

    const { code, err, data } = await userService.userFind(id);
    if (err)
        return res.status(code).send(err);

    return res.status(code).json(data);
}

async function userReadAll(req, res) {
    const { code, err, data } = await userService.userAll();
    if (err)
        return res.status(code).send(err);

    return res.status(code).json(data);
}

function validateUserUpdate(id, body) {
    if (!id || id.length === 0)
        return 'Path must have an id for the user';

    if (!body || Object.keys(body).length === 0)
        return 'Must update at least one field';

    return null;
}
async function userUpdate(req, res) {
    const { body, params: { id } } = req;

    const userErr = validateUserUpdate(id, body);
    if (userErr)
        return res.status(400).send(userErr);

    const { code, err, data } = await userService.userUpdate(id, body);
    if (err)
        return res.status(code).send(err);

    return res.status(code).json(data);
}

async function userDelete(req, res) {
    const { id } = req.params;

    const userErr = validateUserRead(id);
    if (userErr)
        return res.status(400).send(userErr);

    const { code, err, data } = await userService.userDelete(id);
    if (err)
        return res.status(code).send(err);

    return res.status(code).json(data);
}

// Search
function validateSearch(query) {
    return !query ? 'Query must be in request params' : null;
}
async function userSearch(req, res) {
    const query = req.query.query;

    const userErr = validateSearch(query);
    if (userErr)
        return res.status(400).send(userErr);

    const { code, err, data } = await userService.userSearch(query);
    if (err)
        return res.status(code).send(err);

    return res.status(code).json(data);
}

// Auth
function validateLogin(email, pass) {
    if (!email || email.lenght === 0)
        return 'email not valid';

    if (!pass || pass.length === 0)
        return 'password mandatory, must not be empty';
}
async function login(req, res) {
    const { body: { email, pass } } = req;

    const userErr = validateLogin(email, pass);
    if (userErr)
        return res.status(400).send(userErr);

    const { code, err, data } = await userService.userLogin(email, pass);
    if (err)
        return res.status(code).send(err);

    return res.status(200).json(data);
}

async function me({ user }, res) {
    return res.json(user);
}

module.exports = {
    userCreate,
    userRead,
    userReadAll,
    userUpdate,
    userDelete,

    userSearch,

    login,
    me
};
