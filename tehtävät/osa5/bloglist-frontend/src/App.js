import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/loginService'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import'./app.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      username: "",
      password: "",
      newBlog: {},
      blogs: [],
      notification: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const storageUser = window.localStorage.getItem("user")

    console.log("Component Mount: blogs length: ", this.state.blogs.length)
    console.log("Component Mount: blogs : ", this.state.blogs)
    console.log("Storage user: ", storageUser)

    if (storageUser) {
      const user = JSON.parse(storageUser)
      blogService.setToken(user.token)
      this.setState({user})
    }
  } 

  render() {

    if (this.state.user === null) {
      return (<div>
        <h1>Blog List</h1>

        <Notification note={this.state.notification} />

        <Togglable.Togglable buttonLabel="Login">
          <Login.LoginForm app={this} />
        </Togglable.Togglable>

        <h2>Blogs</h2>
        <p>You need to sign in to view the blogs</p>

      </div>
      )
    }

    const blogs = this.state.blogs.sort((a, b) => b.likes - a.likes).map(blog => 
      <Blog.BlogToggle blog={blog} 
      key={blog._id}
      likeBlog={() => this.likeBlog(blog)}
      deleteBlog={() => this.deleteBlog(blog)} />
    )

    const returnable = (<div>
      <h1>Blog List</h1>

      <Notification note={this.state.notification} />

      <Login.LoginInformation app={this} />

      <h2>Add Blog</h2>

      <Blog.BlogForm app={this} />

      <h2>Blogs</h2>
      
      <p>BLOGS SHOULD BE BETWEEN ME</p>
      {blogs}
      <p>BLOGS SHOULD BE BETWEEN ME</p>
      
    </div>)

    return returnable
  }

  // Methods
  login = async (event) => {

    event.preventDefault()

    const credentials = {username: this.state.username, password: this.state.password}

    console.log("Trying to log in with credentials: ", credentials)

    try{
      const user = await loginService.login(credentials)

      console.log("Received response: ", user)

      window.localStorage.setItem("user", JSON.stringify(user))

      blogService.setToken(user.token)
      this.setState({username: "", password: "", user, notification: "Logged in as: " + user.username})

      this.removeNote()
    } catch (exception) {
      this.addNote("Login failed.")
      console.log("Login failed: ", exception)
    }
  }
  logout = (event) => {
    window.localStorage.removeItem("user")
    this.setState({user: null, notification: "Logged out"})
    this.removeNote()
  }

  loginFieldChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  blogFieldChange = (event) => {
    const newBlog = this.state.newBlog

    newBlog[event.target.name] = event.target.value

    this.setState({newBlog})
  }
  addBlog = async (event) => {

    event.preventDefault()

    try {
      
      const response = await blogService.addBlog(this.state.newBlog)
      const blog = {title: response.title, author: response.author}

      this.setState({blogs: this.state.blogs.concat(response), notification: "Added new blog: " + blog.title})
      console.log("Server response: ", response)

      this.removeNote()

    } catch (error) {
      this.addNote("Failed to add new blog")
    }

    
  }
  likeBlog = async (blog) => {


    const newBlog = {
      user: blog.user._id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    const response = await blogService.updateBlog(blog._id, newBlog)
    newBlog.user = response.user
    response.likes = newBlog.likes

    const blogs = this.state.blogs.map(b => {
      if (b._id === blog._id) {
        return response
      } 
      return b
    })

    this.setState({blogs: blogs})
  }
  deleteBlog = async (blog) => {

    console.log("Trying to delete blog.")

    const newBlog = {
      user: blog.user._id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    const response = await blogService.deleteBlog(blog._id)

    const blogs = this.state.blogs.filter(b => b._id !== blog._id)

    this.setState({blogs: blogs})
  }

  addNote(note) {
    this.setState({notification: note})
    this.removeNote()
  }
  removeNote() {
    setTimeout(() => {
      this.setState({notification: null})
    }, 5000)
  }
}

export default App;
