const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesFromDb, newInputSaleFromDb } = require('../../sales.mock');
const { salesService } = require('../../../src/services/index');
const { salesController } = require('../../../src/controllers/index');

chai.use(sinonChai);
const { expect } = chai;

describe('Testes na sales.controller:', function () {
  it('Recuperando a lista de vendas com sucesso', async function () {
    sinon.stub(salesService, 'findAllSales').resolves({
      status: 'SUCCESSFUL',
      data: salesFromDb,
    });
    
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromDb);
  });

  it('Recuperando a lista de vendas pelo id COM sucesso', async function () {
    sinon.stub(salesService, 'findSalesById').resolves({
      status: 'SUCCESSFUL',
      data: salesFromDb,
    });
    
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromDb);
  });

  it('Recuperando a lista de vendas pelo id SEM sucesso', async function () {
    sinon.stub(salesService, 'findSalesById').resolves({
      status: 'NOT_FOUND',
      data: { message: 'message' },
    });
    
    const req = {
      params: { id: 999 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });

  it('Inserindo uma nova venda com sucesso', async function () {
    sinon.stub(salesService, 'insertSale').resolves({
      status: 'CREATED',
      data: { message: 'message' },
    });
    
    const req = {
      body: newInputSaleFromDb,
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.insertSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });

  afterEach(function () {
    sinon.restore();
  });
});