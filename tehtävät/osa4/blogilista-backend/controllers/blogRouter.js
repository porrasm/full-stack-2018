const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {

  console.log("Trying to get blog")

  try {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.status(200).json(blogs)
  } catch (error) {
    response.status(404).send()
  }
})

blogRouter.post('/', async (request, response) => {

  console.log("Trying to add blog")

  try {

    const token = request.body.token

    console.log("Trying to post blog with toke: ", token)

    const decoded = jwt.verify(token, process.env.SECRET)

    if (!token || !decoded.id) {
      return response.status(401).json({error: 'token is invalid or missing'})
    }

    const blog = new Blog(request.body)
    blog.user = decoded.id

    if (blog.title === undefined || blog.url === undefined) {
      return response.status(400).send()
    }

    if (blog.likes === undefined || blog.likes === NaN) {
      blog.likes = 0
    }

    const savedBlog = await blog.save()

    const user = await User.findById(decoded.id)
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(Blog.format(savedBlog))
  } catch (error) {

    if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({error: 'error'})
    }


    console.log('Error creating blog...', error)
    response.status(400).send()
  }
})

blogRouter.delete('/:id', async (request, response) => {
  try {

    const body = request.body
    const token = body.token
    const decoded = jwt.verify(token, process.env.SECRET)

    if (!token || !decoded.id) {
      return response.status(401).json({error: 'token is invalid or missing'})
    }

    console.log("Decoded id: ", decoded.id)
    console.log("Trying to find toDelete: ", body)
    const toDelete = await Blog.findById(request.params.id)
    const toDeleteOwner = toDelete.user
    
    if (toDeleteOwner) {
      if (toDeleteOwner.toString() !== decoded.id.toString()) {
        console.log("Only owner can delete")
        console.log("Delete owner: ", toDeleteOwner)
        console.log("Deletor: ", decoded.id)
  
        return response.status(401).json({error: 'Only the owner can delete the blog'})
      }
    }

    const blog = new Blog(request.body)
    blog.user = decoded.id


    const id = request.params.id
    await Blog.findByIdAndDelete(id)
    response.status(204).send()
  } catch (error) {

    if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({error: 'error'})
    }

    console.log("ERROR: ", error)

    response.status(404).send()
  }
})

blogRouter.put('/:id', async (request, respose) => {

  try {

    const token = request.body.token

    console.log("Trying to update blog with toke: ", token)

    const decoded = jwt.verify(token, process.env.SECRET)

    if (!token || !decoded.id) {
      return response.status(401).json({error: 'token is invalid or missing'})
    }

    const body = request.body
    const newBlog = {
      title: body.title,
      url: body.url,
      author: body.author,
      likes: body.likes,
      user: body.user
    }


    const updated = await Blog.findByIdAndUpdate(request.params.id, newBlog).populate('user', {username: 1, name: 1})
    respose.json(updated).send()
  } catch (error) {
    console.log("\n\nError in blogRouter.put: ", error)
    respose.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogRouter