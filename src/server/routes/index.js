const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = {
        status: 'success',
        message: 'hello, world!'
    };
})
router.get('/webhook', async (ctx) => {
    ctx.body = {
        status: 'success',
        message: 'Webhook success'
    };
})

module.exports = router;