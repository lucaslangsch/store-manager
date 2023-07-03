const productsFromDB = [
  {
    id: 1,
    name: 'Produto 01',
  },
  {
    id: 2,
    name: 'Produto 02',
  },
  {
    id: 3,
    name: 'Produto 03',
  },
];

const productFromDB = {
  id: 1,
  name: 'Product1',
};

const newProductFromDB = {
  id: 4,
  name: 'Product4',
};

const returnFromDB = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1,
  },
  undefined,
];

module.exports = {
  productsFromDB,
  productFromDB,
  newProductFromDB,
  returnFromDB,
};