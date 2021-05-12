'use strict';

module.exports = () => {
  return async function usingjwt(ctx, next) {
    try {
      if (ctx.url.match(/^\/register/)) {
        ctx.body.tag = 'protected';
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
    }
  };
};
