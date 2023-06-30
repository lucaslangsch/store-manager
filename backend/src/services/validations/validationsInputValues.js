const { insertProductSchema } = require('./schema');

const validateNameProduct = (keysObjectToValidate) => {
  const { error } = insertProductSchema.validate(keysObjectToValidate);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

const validateIdSales = (sales) => {
  if (sales.some((sale) => sale.productId === undefined)) {
    return { status: 'BAD_REQUEST', message: '"productId" is required' };
  }
};

const validateQuantitySales = (sales) => {
  if (sales.some((sale) => sale.quantity === undefined)) {
    return { status: 'BAD_REQUEST', message: '"quantity" is required' };
  }

  if (sales.some((sale) => sale.quantity <= 0)) {
    return { status: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1' };
  }
};

module.exports = {
  validateNameProduct,
  validateIdSales,
  validateQuantitySales,
};
