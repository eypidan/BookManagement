const controller = require('./controller.js');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const token = "99fe4c836e3a229af9725e24955dfdb779e315e0"
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