const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesFromDb } = require('../../sales.mock');
const { findAllSales, findSalesById } = require('../../../src/models/sales.model');

const { expect } = chai;

describe('Testes na sales.model:', function () {
  it('Recuperando a lista de vendas com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDb]);
    
    const products = await findAllSales();

    expect(products).to.be.instanceOf(Array);
    expect(products).to.have.length(2);
  });

  it('Recuperando a lista de vendas por id COM sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDb]);
    
    const id = 1;
    const products = await findSalesById(id);

    expect(products).to.be.instanceOf(Array);
    expect(products).to.have.length(2);
    expect(products).to.be.deep.equal(salesFromDb);
  });

  afterEach(function () {
    sinon.restore();
  });
});