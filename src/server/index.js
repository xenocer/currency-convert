const Koa = require('koa');
const indexRoutes = require('./routes/index');
const bodyParser = require('koa-bodyparser');
const config = require('config');
const app = new Koa();
const Redis = require("ioredis");
const redis = new Redis();
const PORT = config.get('PORT');
require('./cron-jobs.js');
app.use(bodyParser());
app.use(indexRoutes.routes());

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;