require('dotenv').config()
const fs = require('fs');
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const session = require('koa-session')
const path = require('path')
const server = require('koa-static')

const staticPath = path.join(__dirname, '../../blog-frontend/build')

const {
  PORT: port = 4000,
  MONGO_URI: mongoURI,
  COOKIE_SIGN_KEY: signKey
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
const ssr = require('./ssr')

router.use('/api', api.routes())

// router.get('/', (ctx) => {
//   ctx.type = 'html';
//   ctx.body = fs.createReadStream(`${staticPath}/index.html`);
// })

router.get('/', ssr)

router.get('/about/:name?', (ctx) => {
  const { name } = ctx.params

  ctx.body = name ? `about ${name}` : 'about'
})

router.get('/posts', (ctx) => {
  const { id } = ctx.query

  ctx.body = id ? `post #${id}` : 'there is no id for post'
})

app.use(bodyParser())

const sessionConfig = {
  maxAge: 86400000
}
app.use(session(sessionConfig, app))
app.keys = [signKey]

app.use(router.routes()).use(router.allowedMethods())

app.use(server(staticPath))
app.use(ssr)

app.listen(port, () => {
  console.log(`listening to port ${port}`)
})
