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
    let content = body[0]
    let text = content.message.text
    let user = content.source.userId
    let regex = {
        split :  new RegExp('[a-z]+|[^a-z]+', 'gi'),
        trim :  new RegExp('\\s+', 'g')
    }
    let trim = _.replace(text, regex.trim, '')
    let split = trim.match(regex.split)
    let amount = _.isNaN(_.toNumber(split[0])) ? NaN :_.toNumber(split[0])
    let unit = _.isNil(split[1])||_.isEmpty(split[1])? 'USD' : _.toUpper(split[1])
    let testUnit = _.isNil(_.find(config.get('CURRENCYS'), function(currency) { return currency == unit}))? 'Not Pass' : "Pass"
    if (_.isNaN(amount)  || testUnit === "Not Pass") {
        let message = 'กรุณากรอกข้อมูลใหม่อีกครั้ง'
           await pushMessage(user, message)
    } else {
        await fixer.lastedCurrency(amount, unit).then(resp => {
            let message = `${amount} ${unit} เท่ากับ ${resp} บาท`
            pushMessage(user, message)
        })

    }
})
function pushMessage (receiver, message) {
    return client.pushMessage(receiver, {
        type:   'text',
        text:   message
    }).catch(err => {
        throw err
    })
}

module.exports = router;