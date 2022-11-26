const { model } = require('mongoose');

const userSchema = require('../schema/users');

const User = model('User', userSchema);

module.exports = User;