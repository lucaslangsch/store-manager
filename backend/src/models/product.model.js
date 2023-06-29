const connection = require('./connection');

const getFormattedColumnNames = (object) => Object.keys((object)).join(',');
const getFormattedPlaceholders = (object) => Object.keys(object).map(() => '?').join(',');

const findAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products;');
  return products;
};

const findProductById = async (id) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

const createProduct = async (productBody) => {
  const columns = getFormattedColumnNames(productBody);
  const placeholders = getFormattedPlaceholders(productBody);

  const query = `INSERT INTO products (${columns}) VALUE (${placeholders});`;

  const [{ insertId }] = await connection.execute(query, [...Object.values(productBody)]);
  return insertId;
};

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
};