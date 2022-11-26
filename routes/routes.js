const express = require('express');
const app = express();

app.use(require('./user.routes'));
app.use(require('./media.routes'));
app.use(require('./product.routes'));
app.use(require('./order.routes'));
app.use(require('./planner.routes'));
app.use(require('./comment.routes'));
app.use(require('./review.routes'));

module.exports = app;
