const mediaService = require('../service/media.service');
const express = require('express');

function validateImageRead(id) {
    return !id ? 'Path must specify image with id' : null;
}
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @returns 
 */
async function imageRead(req, res) {
    const { id } = req.params;

    const userErr = validateImageRead(id);
    if (userErr)
        return res.status(400).send(userErr);

    const { code, err, data: media } = await mediaService.mediaFind(id);
    if (err)
        return res.status(code).send(err);

    res.setHeader('Content-Type', media.mime);
    return res.send(media.data);
}

module.exports = {
    imageRead
};
