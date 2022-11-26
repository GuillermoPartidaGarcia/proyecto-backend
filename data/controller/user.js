const User = require('../model/user');

const getUser = conditions => User.findOne(conditions);

const getUsers = (conditions = {}) => User.find(conditions);

const countUsers = (conditions = {}) => User.count(conditions);

const createUser = doc => User.create(doc);

const changeUser = (conditions, doc) => User.updateOne(conditions, doc);

const changeUsers = (conditions, doc) => User.updateMany(conditions, doc);

const removeUser = conditions => User.remove(conditions);

module.exports = {
    getUser,
    getUsers,
    countUsers,
    createUser,
    changeUser,
    changeUsers,
    removeUser,
};
