/* eslint valid-jsdoc: "off" */

'use strict';


// const compress = require('../app/middleware/compress');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1619449903491_9344';

  // add your middleware config here
  config.middleware = [
    'gzip',
    'compress',
    'errorHandler',
    // 'usingjwt',
  ];
  config.errorHandler = {
    match: '/topics',
  };

  // csrf 关闭;
  config.security = {
    // 开发环境关闭csrf判断；
    csrf: {
      enable: false,
    },
  };

  // add your user config here


  // xauth 验证;
  // config/config.default.js
  // module.exports = {
  //   middleware: [ 'compress' ],
  //   compress: {
  //     threshold: 2048,
  //   },
  // };
  config.compress = {
    threshold: 2048,
  };
  // 配置koa-jwt 中间件;
  // config.usingjwt = {
  //   secret: 'mysecret', // koa-jwt 中间件配置secret;
  // };
  const userConfig = {
    myAppName: 'egg',
  };
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'egg-sequelize-doc-unittest',
  };
  return {
    ...config,
    ...userConfig,
  };
};
