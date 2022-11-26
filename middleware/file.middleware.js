const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const uploadSingle = name => upload.single(name);

const uploadMultiple = name => upload.array(name);

module.exports = {
    uploadSingle,
    uploadMultiple,
};
