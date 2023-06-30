const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesFromDb, newSaleFromDb, newInputSaleFromDb, newInputSaleWithQntdZero, newInputSaleWithoutQntd, newInputSaleWithoutId } = require('../../sales.mock');
const { salesModel, productModel } = require('../../../src/models/index');
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

  it('Inserindo uma nova venda com sucesso', async function () {
    sinon.stub(productModel, 'allProductsExist').resolves();
    sinon.stub(salesModel, 'insertSale').resolves(newSaleFromDb);
    
    const sales = await salesService.insertSale(newInputSaleFromDb);

    expect(sales.status).to.be.equal('CREATED');
    expect(sales.data).to.be.deep.equal(newSaleFromDb);
  });

  it('Inserindo uma nova venda SEM sucesso, quantidade igual a 0', async function () {  
    const sales = await salesService.insertSale(newInputSaleWithQntdZero);

    expect(sales.status).to.be.equal('INVALID_VALUE');
    expect(sales.data.message).to.be.equal('"quantity" must be greater than or equal to 1');
  });

  it('Inserindo uma nova venda SEM sucesso, sem a propriedade quantity', async function () {  
    const sales = await salesService.insertSale(newInputSaleWithoutQntd);

    expect(sales.status).to.be.equal('BAD_REQUEST');
    expect(sales.data.message).to.be.equal('"quantity" is required');
  });

  it('Inserindo uma nova venda SEM sucesso, sem a propriedade productId', async function () {  
    const sales = await salesService.insertSale(newInputSaleWithoutId);

    expect(sales.status).to.be.equal('BAD_REQUEST');
    expect(sales.data.message).to.be.equal('"productId" is required');
  });

  it('Inserindo uma nova venda SEM sucesso, produto inexistente', async function () {
    sinon.stub(productModel, 'allProductsExist').resolves(true);
    
    const sales = await salesService.insertSale(newInputSaleFromDb);

    expect(sales.status).to.be.equal('NOT_FOUND');
    expect(sales.data).to.be.deep.equal({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});