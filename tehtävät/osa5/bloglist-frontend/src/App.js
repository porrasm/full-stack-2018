import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/loginService'
import Notification from './components/Notification'
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

        <Login.LoginForm app={this} />

        <h2>Blogs</h2>

        {this.state.blogs.map(blog => 
          <Blog.Blog key={blog._id} blog={blog}/>
        )}
      </div>
      )
    }

    return (
      <div>
        <h1>Blog List</h1>

        <Notification note={this.state.notification} />

        <Login.LoginInformation app={this} />

        <h2>Add Blog</h2>

        <Blog.BlogForm app={this} />

        <h2>Blogs</h2>

        {this.state.blogs.map(blog => 
          <Blog.Blog key={blog._id} blog={blog}/>
        )}
      </div>
    )
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

      this.setState({blogs: this.state.blogs.concat(blog), notification: "Added new blog: " + blog.title})
      console.log("Server response: ", response)

      this.removeNote()

    } catch (error) {
      this.addNote("Failed to add new blog")
    }

    
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
