const Router = require('koa-router');
const line = require('@line/bot-sdk');
const _ = require('lodash')
const router = new Router();
const config = require('config');
const fixer  =  require('../../adapter/fixer')
const configData = {
    channelAccessToken:  config.get('LINE_CHANNEL_ACCESS_TOKEN'),
    channelSecret: config.get('LINE_CHANNEL_SECRET'),
};
const client = new line.Client(configData);

router.get('/', async (ctx) => {
    ctx.body = {
        message: 'Currency Convert API'
    };
})
router.post('/webhook', async (ctx) => {
    ctx.status = 200
    let body = _.get(ctx.request.body, 'events', {})
    console.log(body)
    let content = body[0]
    let text = content.message.text
    let sender = content.source.userId
    let replyToken = content.replyToken
    console.log(text)
    console.log(sender)
    let regex = new RegExp('[a-z]+|[^a-z]+', 'gi')
    let trim = _.trim(text, ' ')
    let split = trim.match(regex)
    let amount = split[0]
    let unit = _.isNil(split[1])||_.isEmpty(split[1])? 'USD' : _.toUpper(split[1])
    console.log(amount)
    console.log(unit)
    // await fixer.convertCurrency()
})

module.exports = router;