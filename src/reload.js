const path = require("path");
const reloadDebug = require("debug")("reload");
const http = require("http");

const srcDir = path.resolve(process.cwd(), "src");

const chokidar = require("chokidar");

const Koa = require("koa");

const app = new Koa();
let koaCallback;

const handleRequest = (req, res) => {
  return koaCallback(req, res);
};

function addMiddles(app) {
  let user = require("./routers/users");
  app.use(user.routes());
}

function freshApp(app) {
  app.middleware = [];
  addMiddles(app);
  koaCallback = app.callback();
  return app;
}

freshApp(app);

const server = http.createServer(handleRequest);

// One-liner for current directory
chokidar.watch(srcDir).on("all", (event, path) => {
  reloadDebug(event, path);
  console.log("reload: ", event, path);
  if (event === "change") {
    delete require.cache[path];
    freshApp(app);
  }
});

server.listen(3030);
