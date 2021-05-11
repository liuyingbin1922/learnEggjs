'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    console.log('index router');
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.user.list(query);
  }

  async login() {
    const ctx = this.ctx;
    // post请求传来的参数
    const { name, password } = ctx.request.body;
    let message = '',
      data = {};
    // 判断数据库里面是否存在该用户
    const user = await ctx.model.User.findOne({
      where: {
        name,
      },
    });
    if (!user) {
      message = '用户不存在';
    } else if (password !== user.password) {
      message = '密码错误';
    } else {
      message = '登录成功';
      data = { id: user.id };
    }

    ctx.body = {
      message,
      data,
    };
  }


  async register() {
    const ctx = this.ctx;
    const { name, password, age } = ctx.request.body;
    let data = {};
    let message = '';
    const res = await ctx.model.User.findOne({
      where: {
        name,
      },
    });
    if (res) {
      message = '用户已存在';
    } else {
      const insertresult = await ctx.service.user.create({ name, password, age });
      if (!insertresult) {
        message = '注册失败';
      } else {
        message = '注册成功';
        data = insertresult;
      }
    }
    ctx.body = {
      message,
      data,
    };
  }


  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.user.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const user = await ctx.service.user.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const body = ctx.request.body;
    ctx.body = await ctx.service.user.update({ id, updates: body });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    await ctx.service.user.del(id);
    ctx.status = 200;
  }
}

module.exports = UserController;
