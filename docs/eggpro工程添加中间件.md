#### eggpro 工程添加中间件

- background：

说到中间件，其实node本身并没有中间件，这里指的是koa2 的中间件，koa2 的核心代码就只有五六百行，主要是实现了一个中间件内核，说到这里，还是有必要看一下koa2的源码的，听说是质量很高的一段代码。

扯回来中间件，中间件主要是完成业务中通用的服务，比如说，koa-is-json就是判断返回的数据是否是json格式，所以看到这里，可以说在业务中，中间件的应用就是为了完成可抽离的通用业务。 那么在eggjs中该如何应用中间件呢，body 部分就是展示如何在工程中配置并使用中间件。


- body

首先中间件的函数实现是在middleware文件夹中进行定义。 举例说，现在的开发中，用户信息从存储在cookie中转到存储到jwt中，koa-jwt 就是处理jwt的中间件，所以，这次的实践是在eggpro工程中添加koa-jwt。koa-jwt属于koa中间件生态，eggjs引用koa中间件也制定了一套配置的规则，首先在middleware中新建jwt.js，使用commonjs 导出该对象：

```
'use strict';

module.exports = require('koa-jwt');
```

之后在config.default.js 文件中配置一下jwt属性:

```
 // 配置koa-jwt 中间件;sdskjd
  config.jwt = {
    secret: 'mysecret', // koa-jwt 中间件配置secret;
  };
```
引用koa生态的中间件确实是挺简单的 ，这里还有一个重要的业务点是在工程中使用JWT 进行用户信息的校验，这里继续补充一下业务代码引入该工具。

****
中间件到这里暂时还没有业务需要，先待定在写；
****


- end












