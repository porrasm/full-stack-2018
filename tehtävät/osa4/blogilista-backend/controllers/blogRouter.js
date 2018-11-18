const blogRouter  = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({})
    response.status(200).json(blogs)
  })
  
  blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
  
    if (blog.title === undefined || blog.url === undefined) {
      return response.status(400).send()
    }

    if (blog.likes === undefined || blog.likes === NaN) {
      blog.likes = 0
    }

    const result = await blog.save()
    response.status(201).json(result)
  })

  module.exports = blogRouter