const connection = require('./connection');

const findAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products;');
  return products;
};

const findProductById = async (id) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

module.exports = {
  findAllProducts,
  findProductById,
};