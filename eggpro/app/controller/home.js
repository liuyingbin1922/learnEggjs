'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async getanimals() {
    const { ctx } = this;
    ctx.body = {
      status: '200',
      msg: 'ok',
    };
    return {
      status: '200',
      msg: 'ok',
    };
  }
}

module.exports = HomeController;
