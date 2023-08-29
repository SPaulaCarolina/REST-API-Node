const debug = require('debug')('app:module-controller-products');
const createError = require('http-errors');

const { ProductsService } = require("./services");
const { Response} = require('../common/responses');

module.exports.ProductsController = {
  getProducts: async (req, res) => {
    try {
      let products = await ProductsService.getAll();
        Response.success(res, 200, 'Products list', products);
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },
  getProduct: async (req, res) => {
    try {
      const { params: { id } } = req;
      let product = await ProductsService.getByID(id);

      if(!product) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, 'Product', product);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createProduct: async (req, res) => {
    try {
      const { body } = req;

      if(!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const product = await ProductsService.create(body);
        Response.success(res, 200, 'Product created', product);
      }
    } catch (error) {
      debug(error)
      Response.error(res);
    }
  },
  generateReport: async (req, res) => {
    try {
      ProductsService.generateReport('Inventary', res)
    } catch (error) {
      debug(error)
      Response.error(res);
    }
  }
  // update
  // delete
};