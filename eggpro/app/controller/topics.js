'use strict';

// app/controller/topics.js
const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
  accesstoken: 'string',
  title: 'string',
  tab: { type: 'enum', values: [ 'ask', 'share', 'job' ], required: false },
  content: 'string',
};

// 这里使用validate plugin 实现;
/**
 *
 *  调用 validate 方法对请求参数进行验证。
    用验证过的参数调用 service 封装的业务逻辑来创建一个 topic。
    按照接口约定的格式设置响应状态码和内容。
 */

class TopicsController extends Controller {
  async create() {
    const ctx = this.ctx;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(createRule, ctx.request.body);
    // 调用 service 创建一个 topic
    const id = await ctx.service.topics.create(ctx.request.body);
    // 设置响应体和状态码
    ctx.body = {
      topic_id: id,
    };
    ctx.status = 201;
  }
  async show() {
    const { ctx } = this;

    ctx.body = await ctx.service.topics.show({
      id: ctx.params.id,
      mdrender: ctx.query.mdrender !== 'false',
      accesstoken: ctx.query.accesstoken || '',
    });
  }
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.topics.index();
  }

}
module.exports = TopicsController;
