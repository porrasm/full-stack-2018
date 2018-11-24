const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const User = require('../models/user')
const {blogs, users, getAllBlogs, getAllUsers} = require('./blog_test_helper')
let userAmount = users.length

beforeAll(async () => {

    await User.remove({})

    for (let user of users) {
        const userObject = User(user)
        await userObject.save()
    }
})

describe('GET /api/users', () => {

    test('users are returned as json', async () => {
        await api
          .get('/api/users')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })

    test('the correct amount of users is returned', async () => {
        const response = await getAllUsers()
        expect(response.length).toBe(userAmount)
    })

    test('all users are returned correctly', async () => {
        const response = await getAllUsers()
        const contents = response.map(u => u.username)

        for (let i = 0; i < users.length; i++) {
            expect(contents[i]).toBe(users[i].username)
        }
    })
})

describe('POST /api/users', () => {

    test('users can be added', async () => {

        const user = {
            username: "newUser",
            name: "newName",
            password: "newPassword"
        }

        userAmount++
        await api
          .post('/api/users')
          .send(user)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const response = await getAllUsers()
        const usernames = response.map(u => u.username)

        expect(response.length).toBe(userAmount)
        expect(usernames).toContain('newUser')
      })

      test('users with undefined "adult" will bo converted into true', async () => {

        const user = {
            username: "newUser2",
            name: "newName2",
            password: "newPassword2"
        }

        userAmount++
        await api
          .post('/api/users')
          .send(user)
          .expect(200)
          .expect('Content-Type', /application\/json/)


        const response = await api.get('/api/users')
        expect(response.body[userAmount - 1].adult).toBe(true)
      })

      test('users with no username will be rejected', async () => {

        const user = {
            name: "newName2",
            password: "newPassword2"
        }

        await api
          .post('/api/users')
          .send(user)
          .expect(400)

        
        const response = await getAllUsers()
        expect(response.length).toBe(userAmount)
      })

      test('cannot create duplicate users', async () => {

        const user = {
            "username": "user1",
            "name": "name1",
            "password": "password1",
            "adult": true
        }

        await api
          .post('/api/users')
          .send(user)
          .expect(400)

        
        const response = await getAllUsers()
        expect(response.length).toBe(userAmount)
      })
})

afterAll(() => {
    server.close()
})
