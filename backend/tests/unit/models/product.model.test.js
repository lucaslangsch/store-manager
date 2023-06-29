const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productFromDB, productsFromDB, newProductFromDB } = require('../../product.mock');
const { findAllProducts, findProductById, createProduct } = require('../../../src/models/product.model');

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

  it('Cadastrando um produto pelo id com sucesso', async function () {
    sinon.stub(connection, 'execute')
    .onFirstCall()
    .resolves([{ insertId: 4 }])
    .onSecondCall()
    .resolves([[newProductFromDB]]);
    
    const id = await createProduct(newProductFromDB);
    const newProduct = await findProductById(id);

    expect(id).to.be.equal(4);
    expect(newProduct).to.be.an('object');
    expect(newProduct).to.be.deep.equal(newProductFromDB);
  });

  afterEach(function () {
    sinon.restore();
  });
});