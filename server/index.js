const Koa = require('koa')
const database = require('./database')

const app = new Koa()

database()

app.listen(4000)
