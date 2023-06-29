const connection = require('./connection');

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

module.exports = {
  findAllSales,
  findSalesById,
};