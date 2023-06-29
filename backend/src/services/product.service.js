const { productModel } = require('../models/index');
const schema = require('./validations/validationsInputValues');

const findAllProducts = async () => {
  const products = await productModel.findAllProducts();
  return { status: 'SUCCESSFUL', data: products };
};

const findProductById = async (id) => {
  const product = await productModel.findProductById(id);

  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  return { status: 'SUCCESSFUL', data: product };
};

const createProduct = async (productBody) => {
  if (!productBody.name) {
    return { status: 'BAD_REQUEST', data: { message: '\"name\" is required' } };
  }

  const error = schema.validateNameProduct(productBody);
  if (error) return { status: error.status, data: { message: error.message } };

  const newId = await productModel.createProduct(productBody);
  const newProduct = await productModel.findProductById(newId);
  return { status: 'CREATED', data: newProduct };
};

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
};
