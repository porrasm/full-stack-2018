const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]
let blogAmount = blogs.length

beforeAll(async () => {

    console.log('before all')

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
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(blogs.length)
    })

    test('all blogs are returned correctly', async () => {
        const response = await api.get('/api/blogs')
        const contents = response.body.map(b => b.title)

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

        const response = await api.get('/api/blogs')
        const titles = response.body.map(b => b.title)

        expect(response.body.length).toBe(blogAmount)
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

        
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(blogAmount)
        expect(response.body[blogAmount - 1].likes).toBe(0)
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

        
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(blogAmount)
        expect(response.body[blogAmount - 1].likes).toBe(0)
      })
})



afterAll(() => {
    server.close()
})