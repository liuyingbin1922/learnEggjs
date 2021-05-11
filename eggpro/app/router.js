'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/animals', controller.home.getanimals);
  router.resources('users', '/users', controller.user);
  router.post('/login', controller.user.login);
  router.post('/register', controller.user.register);
  router.resources('topics', '/topics', controller.topics);
};
