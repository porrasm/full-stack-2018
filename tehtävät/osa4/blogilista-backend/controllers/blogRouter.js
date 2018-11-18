const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.status(200).json(blogs)
  } catch (error) {
    response.status(404).send()
  }
})

blogRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body)

    if (blog.title === undefined || blog.url === undefined) {
      return response.status(400).send()
    }

    if (blog.likes === undefined || blog.likes === NaN) {
      blog.likes = 0
    }

    const result = await blog.save()
    response.status(201).json(result)
  } catch (error) {
    response.status(400).send()
  }
})

blogRouter.delete('/:id', async (request, response) => {
  try {
    const id = request.params.id
    await Blog.findByIdAndDelete(id)
    response.status(204).send()
  } catch (error) {
    response.status(404).send()
  }
})

blogRouter.put('/:id', async (request, respose) => {

  try {
    const body = request.body
    const newBlog = {
      title: body.title,
      url: body.url,
      author: body.author,
      likes: body.likes
    }

    const updated = await Blog.findByIdAndUpdate(request.params.id, newBlog)
    respose.json(formatBlog(updated)).send()
  } catch (error) {
    console.log("Error in blogRouter.put: ", error)
    respose.status(400).send({ error: 'malformatted id' })
  }
})

const formatBlog = (blog) => {
  return {
    title: blog.title,
    url: blog.url,
    author: blog.author,
    likes: blog.likes,
    id: blog._id
  }
}

module.exports = blogRouter