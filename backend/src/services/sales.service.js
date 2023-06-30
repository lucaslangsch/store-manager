const { salesModel, productModel } = require('../models/index');
const { validateIdSales, validateQuantitySales } = require('./validations/validationsInputValues');

const findAllSales = async () => {
  const sales = await salesModel.findAllSales();
  return { status: 'SUCCESSFUL', data: sales };
};

const findSalesById = async (id) => {
  const sales = await salesModel.findSalesById(id);

  if (!sales || sales.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  return { status: 'SUCCESSFUL', data: sales };
};

const insertSale = async (salesBody) => {
  const erroId = validateIdSales(salesBody);
  if (erroId) {
    return { status: erroId.status, data: { message: erroId.message } };
  }
  
  const erroQuantity = validateQuantitySales(salesBody);
  if (erroQuantity) {
    return { status: erroQuantity.status, data: { message: erroQuantity.message } };
  }
  
  const erroProductDontExist = await productModel.allProductsExist(salesBody);
  if (erroProductDontExist) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  const sales = await salesModel.insertSale(salesBody);
  return { status: 'CREATED', data: sales };
};

module.exports = {
  findAllSales,
  findSalesById,
  insertSale,
};