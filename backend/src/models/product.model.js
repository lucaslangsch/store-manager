const connection = require('./connection');

const getFormattedColumnNames = (object) => Object.keys((object)).join(',');
const getFormattedPlaceholders = (object) => Object.keys(object).map(() => '?').join(',');
const getFormattedUpdateColumns = (object) => Object.keys((object))
  .map((key) => `${key} = ?`)
  .join(', ');

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

const allProductsExist = async (lista) => {
  const promises = lista.map(async (element) => {
    const products = await findProductById(element.productId);
    return products;
  });

  const results = await Promise.all(promises);
  return results.some((result) => result === undefined);
};

const updateProduct = async (productBody, id) => {
  const columns = getFormattedUpdateColumns(productBody);
  const query = `UPDATE products SET ${columns} WHERE id = ?`;
  return connection.execute(query, [...Object.values(productBody), id]);
};

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
  allProductsExist,
  updateProduct,
};