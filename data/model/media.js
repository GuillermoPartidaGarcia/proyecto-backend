const { model } = require('mongoose');

const mediaSchema = require('../schema/media');

const Media = model('Media', mediaSchema);

module.exports = Media;