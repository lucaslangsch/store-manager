const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productFromDB, productsFromDB } = require('../../product.mock');
const { findAllProducts, findProductById } = require('../../../src/models/product.model');

const { expect } = chai;

describe('Testes na product.model:', function () {
  it('Recuperando a lista de produtos com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);
    
    const products = await findAllProducts();

    expect(products).to.be.instanceOf(Array);
    expect(products).to.have.length(3);
  });

  it('Recuperando um produto pelo id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);
    
    const id = 1;
    const product = await findProductById(id);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productFromDB);
  });

  afterEach(function () {
    sinon.restore();
  });
});