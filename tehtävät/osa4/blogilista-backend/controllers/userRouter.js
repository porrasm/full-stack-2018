const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', async (request, response) => {
    try {

        const body = request.body

        if (body === undefined) {
            return response.status(400).json({error: 'Content missing'})
        }

        if (body.password.length < 3) {
            return response.status(400).json({error: 'Password must be at least 3 characters'})
        }

        const duplicate = await User.find({username: body.username})

        if (duplicate.length > 0) {
            return response.status(400).json({error: 'Username must be unique'})
        }

        if (body.username === undefined) {
            return response.status(400).json({error: 'Username missing'})
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            adult: body.adult === undefined ? true : body.adult,
            blogs: [],
            passwordHash
        })

        const saved = await user.save()

        response.json(User.format(saved))
    } catch (error) {
        console.log(error)
        response.status(500).json({error: 'Error creating user'})
    }
})

userRouter.get('/', async (request, response) => {
    try {
        const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
        response.json(users.map(User.format))
    } catch (error) {
        console.log(error)
        response.status(404).send()
    }
})

userRouter.get('/:id', async (request, response) => {
    try {
        const id = request.params.id
        const user = await User.findById(id).populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
        response.json(User.format(user))
    } catch (error) {
        console.log(error)
        response.status(404).send()
    }
})

module.exports = userRouter