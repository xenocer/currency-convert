const axios = require('axios')
const config = require('config');
const _ = require('lodash')
const exchangeRate = `https://api.exchangeratesapi.io/latest?base=`
const adapter = {
    lastedRate (unit) {
        return axios.get(`${exchangeRate}${unit}`).then(resp => {
            let rates = resp.data.rates
            return rates
        }).catch(err => {
            throw err
        })
    },
    lastedCurrency( amount, unit) {
        return axios.get(`${exchangeRate}${unit}`).then(resp => {
            let rates = resp.data.rates
            let THBRate = rates.THB
            return _.round(amount * THBRate, 4)
        }).catch(err => {
            throw err
        })
    }
}
module.exports = adapter