// const m1 = require("./m1");
// const m2 = require("./m2.js");
// const fs = require("fs");
// const koa = require("koa");
// console.log("m1: ", m1);
// console.log("m2: ", m2);

const superRequire = require("./superRequire");

const Koa = require("koa");
const app = new Koa();

const user = superRequire("./routers/users");

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });
app.use(user.routes());

app.listen(3000);
