const express = require('express');
const app = express();
const plannerController = require('../controller/planner.controller');

app.post('/planner-create', plannerController.plannerCreate);
app.get('/planner-read/:id', plannerController.plannerRead);
app.put('/planner-add/:id', plannerController.plannerAddProduct);
app.put('/planner-remove/:id', plannerController.plannerRemoveProduct);
app.put('/planner-reschedule/:id', plannerController.plannerReschedule);
app.put('/planner-buy/:id', plannerController.plannerBuy);
app.delete('/planner-delete/:id', plannerController.plannerDelete);

module.exports = app;
