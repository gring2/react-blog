const Router = require('koa-router')
const posts = require('./posts')

const api = new Router()

api.use('/posts', posts.routes())

api.get('/test', (ctx) => {
  ctx.body = 'test success'
})

module.exports = api
