const Router = require("@koa/router");
const m2 = require("../m2.js");
const m3 = require("../m3.js");

const router = new Router();

router
  .get("/", (ctx, next) => {
    ctx.body = "Hello World!bayes";
  })
  .post("/users", (ctx, next) => {
    // ...
  })
  .put("/users/:id", (ctx, next) => {
    // ...
  })
  .del("/users/:id", (ctx, next) => {
    // ...
  })
  .all("/users/:id", (ctx, next) => {
    // ...
  });

module.exports = router;
