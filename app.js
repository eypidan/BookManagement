const controller = require('./controller.js');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const static = require('koa-static')
const path = require('path')
const app = new Koa();

const staticPath = './static'

app.use(static(
  path.join( __dirname,  staticPath)
))


// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// parse request body:
app.use(bodyParser());

// add controllers:
app.use(controller());

app.listen(1112);
console.log('app started at port 1112.');