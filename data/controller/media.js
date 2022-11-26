const Media = require('../model/media');

const getMedia = conditions => Media.findOne(conditions);

const getMedias = (conditions = {}) => Media.find(conditions);

const countMedia = (conditions = {}) => Media.count(conditions);

const createMedia = doc => Media.create(doc);

const changeMedia = (conditions, doc) => Media.updateOne(conditions, doc);

const changeMedias = (conditions, doc) => Media.updateMany(conditions, doc);

const removeMedia = conditions => Media.remove(conditions);

module.exports = {
    getMedia,
    getMedias,
    countMedia,
    createMedia,
    changeMedia,
    changeMedias,
    removeMedia,
};
