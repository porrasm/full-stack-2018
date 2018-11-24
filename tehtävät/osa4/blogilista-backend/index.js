const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const login = require('./controllers/login')
const userRouter = require('./controllers/userRouter')
const blogRouter = require('./controllers/blogRouter')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

mongoose
  .connect(config.mongoUrl)
  .then( () => {
    console.log('connected to: ', config.mongoUrl)
  })
  .catch ( error => {
    console.log(error)
  })

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(express.static(('build')))
app.use(middleware.tokenParser)

app.use('/api/login', login)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log('server running on port ', config.port)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}