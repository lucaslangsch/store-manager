const route = require('express').Router();
const { productsControler } = require('../controllers');

route.get('/products', productsControler.findAll);
route.get('/products/:id', productsControler.findById);
route.post('/products', productsControler.createProduct);
route.put('/products/:id', productsControler.updateProduct);

module.exports = route;