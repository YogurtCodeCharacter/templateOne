const jsonServer = require('json-server');
const requireDir = require('require-dir');
const context = requireDir('./');
const onKeys = Object.keys(context);
const serviceApiList = require('../services/apiConfig');
const serviceApiKeys = Object.keys(serviceApiList);

let db = {};
let rewRouter = {};
onKeys.forEach((key) => {
  db[key] = context[key];
});
serviceApiKeys.forEach((key) => {
  let realKey = serviceApiList[key].substring(4);
  rewRouter[realKey] = `/${key}`;
});
const server = jsonServer.create()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)
server.use((request, res, next) => {
  request.method = 'GET';
  next();
})

server.use(jsonServer.rewriter(rewRouter));
server.use(router);
server.listen(3000, () => {
  console.log('mock port listen:', 3000)
})