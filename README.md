# koa 热替换方案

解决koa开发过程中频繁重启服务器的问题。

`src/index.js` 是正常的启动方式

`src/reload.js` 监视src文件夹并重新加载中间件