const debug = require('debug')('app:module-controller-users');
const createError = require('http-errors');

const { UsersService } = require("./services");
const { Response} = require('../common/responses');

module.exports.UsersController = {
  getUsers: async (req, res) => {
    try {
      let users = await UsersService.getAll();
        Response.success(res, 200, 'Users list', users);
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },
  getUser: async (req, res) => {
    try {
      const { params: { id } } = req;
      let user = await UsersService.getByID(id);

      if(!user) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, 'User', user);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createUser: async (req, res) => {
    try {
      const { body } = req;

      if(!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const user = await UsersService.create(body);
        Response.success(res, 200, 'User created', user);
      }
    } catch (error) {
      debug(error)
      Response.error(res);
    }
  }

  // update
  // delete
};