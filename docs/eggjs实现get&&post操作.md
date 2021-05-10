#### egg.js 实现post/get操作

- background：
  

    自己是有简单的后端经验的，在大学的时候自己写过thinkphp , 使用它搭建过管理系统的后台系统，对于一些基本的数据库操作和后端基本的业务还是有一定经验的，所以我认为的熟悉一个后端的框架，第一步是搭建一个server ， 连接数据库，可以实现一个登录注册接口来测试。所以本文就从这一点出发，使用eggjs搭建server，支持register/login业务。这是learnegg系列的第一篇文章，后续的文章会从中间件、渐进式开发、restful api 等角度深入介绍后端的业务开发 ，并延伸到serverless 技术、nuxt.js (ssr) 等框架的实践，技术的成长是个持续的过程，不要忘了，技术成长的同时，产品思维、商业思维也要同步保持。


- body：
1. 初始化:

    学习一门新的框架，首先要把框架跑起来，所以初始化这一节要做的事，就是初始化一个egg项目，我这里重点介绍使用模版进行初始化，自己配置的情况，这里我简单说一下，因为在业务开发中，推荐使用模版初始化业务代码。

    下面我们开始吧。
    ****

    ```
    $ mkdir eggpro && cd eggpro
    $ npm init egg --type=simple
    $ npm i
    ```
    注意，这里要求node版本在8以上。

    初始化好了之后，运行eggpro项目：

    ```
    npm run dev
    // open http://localhost:7001
    ```

    在页面上会看到```hi , egg```;

    到目前为止，我们的eggpro工程已经搭建好了。是不是很简单呀，按照流程来，第一个egg项目就开始了。

    这里我还要补充一下使用egg-bin搭建的步骤：

    ```
    $ mkdir eggpro
    $ cd eggpro
    $ npm init
    $ npm i egg --save
    $ npm i egg-bin --save-dev
    ```

    添加npm scripts 到package.json中；

    ```
    {
    "name": "egg-example",
    "scripts": {
            "dev": "egg-bin dev"
        }
    }
    ```
    上述就是使用egg-bin安装的过程。

    走到这一步，有必要还给读者展示一下eggjs的工程目录，对eggjs有一个总体的认识:

    ```
    egg-pro
    ├── package.json
    ├── app.js (可选)
    ├── agent.js (可选)
    ├── app
    |   ├── router.js
    │   ├── controller
    │   |   └── home.js
    │   ├── service (可选)
    │   |   └── user.js
    │   ├── middleware (可选)
    │   |   └── response_time.js
    │   ├── schedule (可选)
    │   |   └── my_task.js
    │   ├── public (可选)
    │   |   └── reset.css
    │   ├── view (可选)
    │   |   └── home.tpl
    │   └── extend (可选)
    │       ├── helper.js (可选)
    │       ├── request.js (可选)
    │       ├── response.js (可选)
    │       ├── context.js (可选)
    │       ├── application.js (可选)
    │       └── agent.js (可选)
    ├── config
    |   ├── plugin.js
    |   ├── config.default.js
    │   ├── config.prod.js
    |   ├── config.test.js (可选)
    |   ├── config.local.js (可选)
    |   └── config.unittest.js (可选)
    └── test
        ├── middleware
        |   └── response_time.test.js
        └── controller
            └── home.test.js
    ```

    可以看到controller、middleware我们都还没有开始写，单元测试可以在写完代码之后对founction 进行测试。

    这里我们先实现register接口，接口的函数是在controller中定义，通过router.js暴露给调用者，涉及到数据库的操作，在service层和model层进行实现。这个是主要的业务逻辑实现过程。

    我们采用自定向下实现接口的封装，首先在controller文件夹中新建user.js文件，在其中写login && register函数；
    ```
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
    ```
    首先从请求中获取name , password, age 属性，之后在判断数据库中是否已存在该用户，不存在的话，通过orm 创建用户信息，存入数据库中。
    最后通过ctx.response.body 属性来传递信息；

    那么下一层的对数据库的业务逻辑处理应该放在service进行处理了，service层主要是封装数据库通用逻辑，举例说：
    查找，删除，修改，创建的操作，看代码：

    ```
    const Service = require('egg').Service;

    class User extends Service {
    async list({ offset = 0, limit = 10 }) {
        return this.ctx.model.User.findAndCountAll({
        offset,
        limit,
        order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
        });
    }

    async find(id) {
        const user = await this.ctx.model.User.findByPk(id);
        if (!user) {
        this.ctx.throw(404, 'user not found');
        }
        return user;
    }

    async create(user) {
        console.log('创建用户信息:', user);
        return this.ctx.model.User.create(user);
    }

    module.exports = User;
    ```
    
    可以从代码中看到，service层主要处理通用的数据库操作逻辑。
    注意到，操作数据库现在使用的是orm 框架操作数据库，这样做的好处是只需要配置一下数据库的配置文件，就可以实现连接不同类型的数据库，像mysql，sqllite,mongodb等，都不是问题。那么连接的配置可以想到，是在model和config.default.js 进行配置，实例代码如下：

    ```
    // config.default.js
      config.sequelize = {
        dialect: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        database: 'egg-sequelize-doc-unittest',
    };
    ```

    // model/user.js 
    ```
    module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
    // user 模型;
    const User = app.model.define('user', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: STRING(30),
        age: INTEGER,
        created_at: DATE,
        updated_at: DATE,
        password: STRING(100),
    });

    User.prototype.associate = function() {
        app.model.User.hasMany(app.model.Post, { as: 'posts' });
    };

    return User;
    };
    ```

    User实体导出之后，在service层直接引用，进而建立更上一层的业务逻辑。
    最后一步，需要在router.js 文件中暴露该接口：

    ```
    module.exports = app => {
        const { router, controller } = app;
        router.post('/register', controller.user.register);
    };
    ```

    register接口到这已经就写完了 ，post 接口也好实现，流程和register接口一样，只是业务逻辑上判断一下用户名和密码是否和数据库一直即可，输出判断的结果。

    post的业务逻辑代码就不在这展示了，相信读者是可以参照register接口写出来的，接口写好之后，建议通过postman测试一下接口是否符合业务要求。
- end:

到了这里，eggpro的项目就可以在本地跑起来了，并实现了register和post的操作；下一篇文章，准备写中间件在业务中的落地实践。








