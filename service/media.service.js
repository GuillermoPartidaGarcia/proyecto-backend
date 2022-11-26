const { getMedia } = require('../data/controller/media');

async function mediaFind(id) {
    try {
        const data = await getMedia({ _id: id });
        if (data === null )
          return { code: 404, err: 'media not found'};

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

module.exports = {
    mediaFind
};
