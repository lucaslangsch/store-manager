const salesFromDb = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const newInputSaleFromDb = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 1,
    quantity: 1,
  },
];

const newSaleFromDb = {
  id: 2,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 1,
      quantity: 1,
    },
  ],
};

const newInputSaleWithQntdZero = [
  {
    productId: 1,
    quantity: 0,
  },
];

const newInputSaleWithoutQntd = [
  {
    productId: 1,
  },
];

const newInputSaleWithoutId = [
  {
    quantity: 1,
  },
];

module.exports = {
  salesFromDb,
  newInputSaleFromDb,
  newSaleFromDb,
  newInputSaleWithQntdZero,
  newInputSaleWithoutQntd,
  newInputSaleWithoutId,
};