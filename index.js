const route = require('koa-route');
const koa = require('koa');

const app = new koa();
const about = ctx => {
  ctx.response.type = 'html';
  ctx.response.body = '<a href="/">Index Page</a>';
};

const main = ctx => {
  ctx.response.body = 'Hello World';
};

app.use(route.get('/', main));
app.use(route.get('/about', about));
app.use(route.get('./login',login));
app.listen(1112);