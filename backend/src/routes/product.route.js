const route = require('express').Router();
const { productsControler } = require('../controllers');

route.get('/products', productsControler.findAll);
route.get('/products/:id', productsControler.findById);

module.exports = route;