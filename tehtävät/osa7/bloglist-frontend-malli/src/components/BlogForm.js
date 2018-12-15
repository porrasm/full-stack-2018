import React from 'react'
import { connect } from 'react-redux';

import { noteChange } from '../reducers/notificationReducer'
import { createBlogAction } from '../reducers/blogReducer'


class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: '',
    }
  }

  addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
    }

    this.props.createBlogAction(blog)
    this.props.noteChange(`blog '${blog.title}' by ${blog.author} added`)
    this.setState({
      title: '',
      url: '',
      author: '',
    })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Luo uusi blogi</h2>

        <form onSubmit={this.addBlog}>
          <div>
            title
            <input
              value={this.state.title}
              name='title'
              onChange={this.handleChange}
            />
          </div>
          <div>
            author
            <input
              value={this.state.author}
              name='author'
              onChange={this.handleChange}
            />
          </div>
          <div>
            url
            <input
              value={this.state.url}
              name='url'
              onChange={this.handleChange}
            />
          </div>

          <button type="submit">Luo</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  noteChange,
  createBlogAction
}

const ConnectedBlogForm = connect(
  null,
  mapDispatchToProps
)(BlogForm)

export default ConnectedBlogForm