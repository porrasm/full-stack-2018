import React from 'react'
import { mount, shallow } from 'enzyme'
import App from '../App'
import Blog from '../components/Blog'
import Notification from '../components/Notification'
jest.mock('../services/blogs')
import blogService from '../services/blogs'

describe.only('App: ', () => {

    let app

    beforeAll(() => {
        app = mount(<App />)
    })

    it('guests cannot view blogs', () => {

        app.update()
        const blogs = app.find(Blog.BlogToggle)

        expect(blogs.length).toEqual(0)
    })

    it('signed in user can view blogs', () => {

        let user = {name: "TEST NAME", username: "TEST USER", token: "TEST TOKEN"}

        localStorage.setItem('user', JSON.stringify(user))
        
        app = mount(<App />)
        
        app.update()

        const blogs = app.find(Blog.BlogToggle)

        console.log("Found blogs length: " + blogs.length)
        console.log("Debug HTML: ", app.debug())

        expect(blogs.length).toEqual(blogService.blogs.length)
    })
})