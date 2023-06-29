const route = require('express').Router();
const { salesController } = require('../controllers');

route.get('/sales', salesController.findAll);
route.get('/sales/:id', salesController.findById);

module.exports = route;