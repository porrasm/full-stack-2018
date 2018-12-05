import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Togglable from './Togglable'
import Blog from './Blog'

describe('Blog toggle: ', () => {
    const blogObject = { title: "title", author: "author", likes: 1, user: {username: "test", name: "test"} }

  it('blog before click', () => {

    const blog = shallow(
      <Blog.BlogToggle blog={blogObject} />
    )

    const contentSmall = blog.find(".blogSmall")
    const contentBig = blog.find(".blogBig")

    const style = contentBig.prop('style');

    console.log("infodiv TEXT: ", contentBig.text())

    console.log("STYLE: " , style)

    expect(contentSmall.text()).toContain(blogObject.title + " by " + blogObject.author)
    expect(style).toHaveProperty('display', 'none')
  })

  it('blog after click', () => {

    const blog = shallow(
      <Blog.BlogToggle blog={blogObject} />
    )

    let contentSmall = blog.find(".blogSmall")
    const button = contentSmall.find("p")
    button.simulate("click")

    contentSmall = blog.find(".blogSmall")
    const contentBig = blog.find(".blogBig")

    const style = contentSmall.prop('style');

    console.log("infodiv TEXT: ", contentSmall.text())

    console.log("STYLE: " , style)

    expect(contentBig.text()).toContain(blogObject.title)
    expect(contentBig.text()).toContain(blogObject.likes)
    expect(style).toHaveProperty('display', 'none')
  })

})