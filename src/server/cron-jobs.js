const config = require('config');
const  JOB_SCHEDULE  = config.get('JOB_SCHEDULE');
const cron = require('node-cron');
const Redis = require("ioredis");
const _ = require('lodash')
const fixer  =  require('../adapter/fixer')
const redis = new Redis();
cron.schedule(JOB_SCHEDULE, () => {
    let Unit = config.get('CURRENCYS')
    _.forEach(Unit,async data => {
        await fixer.lastedRate(data).then(resp => {
            let item = JSON.stringify(resp);
            redis.set(data, item)
        })
    })
    console.log('Get Currency Rate');
});