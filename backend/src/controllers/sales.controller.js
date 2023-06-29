const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (req, res) => {
  const { status, data } = await salesService.findAllSales();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.findSalesById(Number(id));
  return res.status(mapStatusHTTP(status)).json(data);
};

const insertSale = async (req, res) => {
  const salesBody = req.body;
  const { status, data } = await salesService.insertSale(salesBody);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAll,
  findById,
  insertSale,
};