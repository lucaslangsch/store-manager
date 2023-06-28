const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productFromDB, productsFromDB } = require('../../product.mock');
const { productModel } = require('../../../src/models/index');
const { productsService } = require('../../../src/services/index');

chai.use(sinonChai);

describe('Testes na product.service:', function () {
  it('Recuperando a lista de produtos com sucesso', async function () {
    sinon.stub(productModel, 'findAllProducts').resolves(productsFromDB);
    
    const products = await productsService.findAllProducts();

    expect(products.status).to.be.equal('SUCCESSFUL');
    expect(products.data).to.be.deep.equal(productsFromDB);
  });

  it('Recuperando um produto pelo id COM sucesso', async function () {
    const test = sinon.stub(productModel, 'findProductById').resolves(productFromDB);
    
    const id = 1;
    const products = await productsService.findProductById(id);

    expect(products.status).to.be.equal('SUCCESSFUL');
    expect(products.data).to.be.deep.equal(productFromDB);
    expect(test).to.have.been.calledWith(1);
  });

  it('Recuperando um produto pelo id SEM sucesso', async function () {
    sinon.stub(productModel, 'findProductById').resolves(); 
    
    const id = 999;
    const products = await productsService.findProductById(id);

    expect(products.status).to.be.equal('NOT_FOUND');
    expect(products.data).to.be.deep.equal({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});