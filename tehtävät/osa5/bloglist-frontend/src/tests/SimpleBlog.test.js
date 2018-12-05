import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Togglable from '../components/Togglable'
import SimpleBlog from '../components/SimpleBlog'

describe('SimpleBlog: ', () => {
  const blogObject = { title: "title", author: "author", likes: 1 }

  it('renders blog', () => {

    const blog = shallow(
      <SimpleBlog blog={blogObject} />
    )

    const content = blog.find('blogInfo')

    expect(blog.debug()).toContain(blogObject.title)
    expect(blog.debug()).toContain(blogObject.author)
  })

  it('blog onclick', () => {

    const handler = jest.fn()

    const blog = shallow(
      <SimpleBlog blog={blogObject} onClick={handler} />
    )

    const button = blog.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(handler.mock.calls.length).toBe(2)
  })

})