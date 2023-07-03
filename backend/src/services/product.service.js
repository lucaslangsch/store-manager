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
    return { status: 'BAD_REQUEST', data: { message: '"name" is required' } };
  }

  const error = schema.validateNameProduct(productBody);
  if (error) return { status: error.status, data: { message: error.message } };

  const newId = await productModel.createProduct(productBody);
  const newProduct = await productModel.findProductById(newId);

  return { status: 'CREATED', data: newProduct };
};

const updateProduct = async (productBody, id) => {
  if (!productBody.name) {
    return { status: 'BAD_REQUEST', data: { message: '"name" is required' } };
  }

  const error = schema.validateNameProduct(productBody);
  if (error) return { status: error.status, data: { message: error.message } };

  const productExist = await productModel.findProductById(id);
  if (!productExist) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  await productModel.updateProduct(productBody, id);
  const newProduct = await productModel.findProductById(id);
  return { status: 'SUCCESSFUL', data: newProduct };
};

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
};
