const Router = require('koa-router')
const posts = require('./posts')
const auth = require('./auth')

const api = new Router()

api.use('/posts', posts.routes())
api.use('/auth', auth.routes())
api.get('/test', (ctx) => {
  ctx.body = 'test success'
})

module.exports = api
