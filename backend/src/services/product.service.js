const { productModel } = require('../models/index');

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

module.exports = {
  findAllProducts,
  findProductById,
};
