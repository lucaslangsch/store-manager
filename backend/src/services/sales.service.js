const { salesModel } = require('../models/index');

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

module.exports = {
  findAllSales,
  findSalesById,
};