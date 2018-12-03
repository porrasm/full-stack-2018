import React from 'react'

const Blog = ({blog}) => (
  <div>
    {blog.title} by {blog.author}
  </div>  
)

class BlogToggle extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        minimized: true
    }
  }

  toggle = () => {

    console.log("Toggle")
    this.setState({minimized: !this.state.minimized})
  }

  likeBlog = async (blog) => {
    console.log("Liking blog")


  }

  render() {

    const hideWhenVisible = { display: this.state.minimized ? '' : 'none' }

    const showWhenVisible = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
      display: this.state.minimized ? 'none' : ''
    }

    const user = JSON.parse(window.localStorage.getItem("user"))

    if (user.username === this.props.blog.user.username || this.props.blog.user === null) {
      return (
        <div>
          <div style={hideWhenVisible}>
            <p onClick={this.toggle}>{this.props.blog.title} by {this.props.blog.author}</p>
          </div>
          <div style={showWhenVisible}>
          <p onClick={this.toggle}>{this.props.blog.title} by {this.props.blog.author}</p>
          <a href={this.props.blog.url}>{this.props.blog.url}</a>
          <p>Likes: {this.props.blog.likes}</p><button onClick={this.props.likeBlog}>Like</button>
          <p>Added by {this.props.blog.user.name}</p>
          <button onClick={this.props.deleteBlog}>Delete</button>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div style={hideWhenVisible}>
            <p onClick={this.toggle}>{this.props.blog.title} by {this.props.blog.author}</p>
          </div>
          <div style={showWhenVisible}>
          <p onClick={this.toggle}>{this.props.blog.title} by {this.props.blog.author}</p>
          <a href={this.props.blog.url}>{this.props.blog.url}</a>
          <p>Likes: {this.props.blog.likes}</p><button onClick={this.props.likeBlog}>Like</button>
          <p>Added by {this.props.blog.user.name}</p>
          </div>
        </div>
      )
    }
  }

  deleteButton = (blog) => {
    
    
  }

}

const BlogForm = ({app}) => (
  
  <div>
    
    <form onSubmit={app.addBlog}>
    
      <div>
        Title
          <input
            type="text"
            name="title"
            value={app.state.newBlog.title}
            onChange={app.blogFieldChange}
          />
      </div>

      <div>
        Author
          <input
            type="text"
            name="author"
            value={app.state.newBlog.author}
            onChange={app.blogFieldChange}
          />
      </div>

      <div>
        URL
          <input
            type="text"
            name="url"
            value={app.state.newBlog.url}
            onChange={app.blogFieldChange}
          />
      </div>
      <button type="submit">Submit</button>
    </form>

  </div>  
)

export default {Blog, BlogForm, BlogToggle}