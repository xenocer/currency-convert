const axios = require('axios')
const config = require('config');
const fixer = `http://data.fixer.io/api/latest?access_key =${config.get('FIXER_TOKEN')}`
const adapter = {
    convertCurrency(from, to, amount) {
        return axios.get(`${fixer}&from=${from}&to=${to}&amount=${amount}`).then(resp => {
            console.log(resp)
        }).catch(err => {
            throw err
        })
    }
}
module.exports = adapter