const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (req, res) => {
  const { status, data } = await productsService.findAllProducts();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.findProductById(Number(id));
  return res.status(mapStatusHTTP(status)).json(data);
};

const createProduct = async (req, res) => {
  const productBody = req.body;
  const { status, data } = await productsService.createProduct(productBody);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAll,
  findById,
  createProduct,
};