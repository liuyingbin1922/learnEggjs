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

- end:

到了这里，eggpro的项目就可以在本地跑起来了，并实现了register和post的操作；








