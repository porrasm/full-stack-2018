const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const Blog = require('./models/blog')
const blogRouter = require('./controllers/blogRouter')

module.exports = Blog

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

app.use('/api/blogs', blogRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})