const express = require('express');
const app = express();
const commentController = require('../controller/comment.controller');

app.post('/comment-create', commentController.commentCreate);

app.get('/comment-read/:id', commentController.commentRead);
app.get('/comment-product/:id', commentController.commentFromProduct);
app.get('/comment-user/:id', commentController.commentFromUser);

app.put('/comment-update/:id', commentController.commentUpdate);
app.delete('/comment-delete/:id', commentController.commentDelete);

module.exports = app;
