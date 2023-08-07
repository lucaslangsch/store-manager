const connection = require('./connection');
const getDate = require('../utils/getDate');

const findAllSales = async () => {
  const query = (`
    SELECT sales.id AS saleId, sales.date, product_id AS productId, quantity FROM sales_products
    INNER JOIN sales
    ON sales_products.sale_id = sales.id
    ORDER BY saleId, productId ASC;
  `);

  const [sales] = await connection.execute(query);
  return sales;
};

const findSalesById = async (id) => {
  const query = (`
  SELECT sales.date, product_id AS productId, quantity FROM sales_products
  INNER JOIN sales
  ON sales_products.sale_id = sales.id
  WHERE sales.id = ?
  ORDER BY productId ASC;`);

  const [sales] = await connection.execute(query, [id]);
  return sales;
};

const insertSale = async (salesBody) => {
  const queryForSale = 'INSERT INTO sales (date) VALUE (?);';
  const [{ insertId }] = await connection.execute(queryForSale, [getDate()]);

  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?);';
  await Promise.all(salesBody.map(async (element) => {
    await connection.execute(query, [insertId, ...Object.values(element)]);
  }));

  return {
    id: insertId,
    itemsSold: [...salesBody],
  };
};

const deleteSale = async (id) => {
  await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
};

module.exports = {
  findAllSales,
  findSalesById,
  insertSale,
  deleteSale,
};