const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { productsFromDB } = require('../product.mock');
const app = require('../../src/app');
const { productModel } = require('../../src/models/index');

const { expect } = chai;
chai.use(chaiHttp);

describe('Testando a API', function () {
  describe('Usando o método GET em /products', function () {
    it('Retorna a lista completa de produtos', async function () {
      sinon.stub(productModel, 'findAllProducts').resolves(productsFromDB);

      const response = await chai.request(app).get('/products');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(productsFromDB);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
