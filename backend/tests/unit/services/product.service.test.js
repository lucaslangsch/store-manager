const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productFromDB, productsFromDB, newProductFromDB } = require('../../product.mock');
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

  it('Cadastrando um novo produto', async function () {
    sinon.stub(productModel, 'createProduct').resolves(newProductFromDB.id);
    sinon.stub(productModel, 'findProductById').resolves(newProductFromDB);
    
    const newProduct = await productsService.createProduct({ name: 'Product4' });

    expect(newProduct.status).to.be.equal('CREATED');
    expect(newProduct.data).to.be.deep.equal(newProductFromDB);
  });

  it('Cadastrando um novo produto sem NAME', async function () {
    sinon.stub(productModel, 'createProduct').resolves(newProductFromDB.id);
    sinon.stub(productModel, 'findProductById').resolves(newProductFromDB);
    
    const newProduct = await productsService.createProduct({ name: '' });

    expect(newProduct.status).to.be.equal('BAD_REQUEST');
  });

  it('Cadastrando um novo produto com NAME inválido', async function () {
    sinon.stub(productModel, 'createProduct').resolves(newProductFromDB.id);
    sinon.stub(productModel, 'findProductById').resolves(newProductFromDB);
    
    const newProduct = await productsService.createProduct({ name: 'Pro' });

    expect(newProduct.status).to.be.equal('INVALID_VALUE');
  });

  it('Alterando um produto', async function () {
    sinon.stub(productModel, 'findProductById').resolves(productFromDB);
    sinon.stub(productModel, 'updateProduct').resolves({ id: 1, name: 'Product' });
    
    const newProduct = await productsService.updateProduct({ name: 'Product' }, 1);

    expect(newProduct.status).to.be.equal('SUCCESSFUL');
    expect(newProduct.data).to.be.deep.equal({ id: 1, name: 'Product' });
  });

  it('Alterando um produto sem a propriedade name', async function () {
    sinon.stub(productModel, 'findProductById').resolves(productFromDB);
    // sinon.stub(productModel, 'updateProduct').resolves({ id: 1 });
    
    const newProduct = await productsService.updateProduct(1);

    expect(newProduct.status).to.be.equal('BAD_REQUEST');
    expect(newProduct.data).to.be.deep.equal({ message: '"name" is required' });
  });

  it('Alterando um produto com a propriedade name insuficente', async function () {
    sinon.stub(productModel, 'findProductById').resolves(productFromDB);
    // sinon.stub(productModel, 'updateProduct').resolves({ id: 1, name: 'Pro' });
    
    const newProduct = await productsService.updateProduct({ name: 'Pro' }, 1);

    expect(newProduct.status).to.be.equal('INVALID_VALUE');
    expect(newProduct.data).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });

  it('Alterando um produto inexistente', async function () {
    sinon.stub(productModel, 'findProductById').resolves(false);
    // sinon.stub(productModel, 'updateProduct').resolves({ id: 99, name: 'Product' });
    
    const newProduct = await productsService.updateProduct({ name: 'Product' }, 99);

    expect(newProduct.status).to.be.equal('NOT_FOUND');
    expect(newProduct.data).to.be.deep.equal({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});