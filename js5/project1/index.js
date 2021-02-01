const moment = require('moment')

const a = moment().startOf('day').fromNow()
const b = moment().startOf('week').fromNow()
const c = moment().startOf('minutes').fromNow()

console.log('a is ', a)
console.log('c is ', c)