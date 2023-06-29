const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesFromDb } = require('../../sales.mock');
const { salesModel } = require('../../../src/models/index');
const { salesService } = require('../../../src/services/index');

chai.use(sinonChai);

describe('Testes na sales.service:', function () {
  it('Recuperando a lista de vendas com sucesso', async function () {
    sinon.stub(salesModel, 'findAllSales').resolves(salesFromDb);
    
    const sales = await salesService.findAllSales();

    expect(sales.status).to.be.equal('SUCCESSFUL');
    expect(sales.data).to.be.deep.equal(salesFromDb);
  });

  it('Recuperando a lista de vendas por Id COM sucesso', async function () {
    const test = sinon.stub(salesModel, 'findSalesById').resolves(salesFromDb);
    
    const id = 1;
    const sales = await salesService.findSalesById(id);

    expect(sales.status).to.be.equal('SUCCESSFUL');
    expect(sales.data).to.be.deep.equal(salesFromDb);
    expect(test).to.have.been.calledWith(1);
  });

  it('Recuperando a lista de vendas por Id SEM sucesso', async function () {
    sinon.stub(salesModel, 'findSalesById').resolves();
    
    const id = 999;
    const sales = await salesService.findSalesById(id);

    expect(sales.status).to.be.equal('NOT_FOUND');
    expect(sales.data).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('Recuperando a lista de vendas por Id SEM sucesso mas com array vazio', async function () {
    sinon.stub(salesModel, 'findSalesById').resolves([]);
    
    const id = 999;
    const sales = await salesService.findSalesById(id);

    expect(sales.status).to.be.equal('NOT_FOUND');
    expect(sales.data).to.be.deep.equal({ message: 'Sale not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});