const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const {blogs, getAllBlogs} = require('./blog_test_helper')
let blogAmount = blogs.length

beforeAll(async () => {

    await Blog.remove({})

    for (let blog of blogs) {
        const blogObject = Blog(blog)
        await blogObject.save()
    }
})

describe('GET /api/blogs', () => {

    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })

    test('the correct amount of blogs is returned', async () => {
        const response = await getAllBlogs()
        expect(response.length).toBe(blogAmount)
    })

    test('all blogs are returned correctly', async () => {
        const response = await getAllBlogs()
        const contents = response.map(b => b.title)

        for (let i = 0; i < blogs.length; i++) {
            expect(contents[i]).toBe(blogs[i].title)
        }
    })
})

describe('POST /api/blogs', () => {

    test('blogs can be added', async () => {

        const blog = {
            title: "title",
            author: "author",
            url: "url",
            likes: 1
        }

        blogAmount++
        await api
          .post('/api/blogs')
          .send(blog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const response = await getAllBlogs()
        const titles = response.map(b => b.title)

        expect(response.length).toBe(blogAmount)
        expect(titles).toContain('title')
      })

      test('blogs with undefined likes will bo converted into 0', async () => {

        const blog = {
            title: "title",
            author: "author",
            url: "url",
        }

        blogAmount++
        await api
          .post('/api/blogs')
          .send(blog)
          .expect(201)
          .expect('Content-Type', /application\/json/)


        const response = await api.get('/api/blogs')
        expect(response.body[blogAmount - 1].likes).toBe(0)
      })

      test('blogs with not title will be rejected', async () => {

        const blog = {
            author: "author",
            url: "url",
            likes: 1
        }

        await api
          .post('/api/blogs')
          .send(blog)
          .expect(400)

        
        const response = await getAllBlogs()
        expect(response.length).toBe(blogAmount)
      })

      test('blogs with not url will be rejected', async () => {

        const blog = {
            title: "title",
            author: "author",
            likes: 1
        }

        await api
          .post('/api/blogs')
          .send(blog)
          .expect(400)

        
        const response = await getAllBlogs()
        expect(response.length).toBe(blogAmount)
      })
})



afterAll(() => {
    server.close()
})
