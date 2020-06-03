const Router = require('koa-router');
const line = require('@line/bot-sdk');
const _ = require('lodash')
const router = new Router();
const config = require('config');
const configData = {
    channelAccessToken:  config.get('LINE_CHANNEL_ACCESS_TOKEN'),
    channelSecret: config.get('LINE_CHANNEL_SECRET'),
};
const client = new line.Client(configData);
const message = {
    type: 'text',
    text: 'Hello World!'
};
router.get('/', async (ctx) => {
    ctx.body = {
        message: 'Currency Convert API'
    };
})
router.post('/webhook', async (ctx) => {
    ctx.status = 200
    let body = _.get(ctx.request.body, 'events', {})
    let content = body[0]
    let text = content.message.text
    let sender = content.source.userId
    let replyToken = content.replyToken
    console.log(text)
    console.log(sender)
})

module.exports = router;