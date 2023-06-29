const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productFromDB, productsFromDB, newProductFromDB } = require('../../product.mock');
const { productsService } = require('../../../src/services/index');
const { productsControler } = require('../../../src/controllers/index');

chai.use(sinonChai);
const { expect } = chai;

describe('Testes na product.controller:', function () {
  it('Recuperando a lista de produtos com sucesso', async function () {
    sinon.stub(productsService, 'findAllProducts').resolves({
      status: 'SUCCESSFUL',
      data: productsFromDB,
    });
    
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsControler.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromDB);
  });

  it('Recuperando um produto pelo id COM sucesso', async function () {
    sinon.stub(productsService, 'findProductById').resolves({
      status: 'SUCCESSFUL',
      data: productFromDB,
    });
    
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsControler.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productFromDB);
  });

  it('Recuperando um produto pelo id SEM sucesso', async function () {
    sinon.stub(productsService, 'findProductById').resolves({
      status: 'NOT_FOUND',
      data: { message: 'message' }, // { message: 'message' }
    });
    
    const req = {
      params: { id: 9999 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsControler.findById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });

  it('Cadastrando um produto COM sucesso', async function () {
    sinon.stub(productsService, 'createProduct').resolves({
      status: 'SUCCESSFUL',
      data: newProductFromDB,
    });
    
    const req = {
      body: { name: 'sdfsdf' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsControler.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(newProductFromDB);
  });

  afterEach(function () {
    sinon.restore();
  });
});