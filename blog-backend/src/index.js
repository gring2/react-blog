require('dotenv').config()

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')

const {
  PORT: port = 4000,
  MONGO_URI: mongoURI
} = process.env

mongoose.Promise = global.Promise
mongoose.connect(mongoURI, { useNewUrlParser: true }).then(() => {
  console.log('connected to mongodb')
}).catch((e) => {
  console.error(e)
})

const api = require('./api')

const app = new Koa()
const router = new Router()

router.use('/api', api.routes())

router.get('/', (ctx) => {
  ctx.body = 'home'
})

router.get('/about/:name?', (ctx) => {
  const { name } = ctx.params

  ctx.body = name ? `about ${name}` : 'about'
})

router.get('/posts', (ctx) => {
  const { id } = ctx.query

  ctx.body = id ? `post #${id}` : 'there is no id for post'
})

app.use(bodyParser())

app.use(router.routes()).use(router.allowedMethods())

app.listen(port, () => {
  console.log(`listening to port ${port}`)
})
