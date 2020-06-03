const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = {
        message: 'Currency Convert API'
    };
})
router.post('/webhook', async (ctx) => {
    ctx.status = 200
    console.log(ctx)
})

module.exports = router;