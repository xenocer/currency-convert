const Koa = require('koa');
const indexRoutes = require('./routes/index');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const PORT = 3001;
app.use(bodyParser());
app.use(indexRoutes.routes());

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;