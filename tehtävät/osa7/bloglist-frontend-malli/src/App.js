import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogServiceAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA from './services/blogs'
import loginService from './services/login'

import { noteChange } from './reducers/notificationReducer'
import { initBlogs, createBlogAction, voteBlogAction, deleteBlogAction } from './reducers/blogReducer'
import { setCurrentUser, initUsers } from './reducers/userReducer'
import { connect } from 'react-redux';
import blogs from './services/blogs'
import users from './services/users'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA: null,
      username: '',
      password: '',
      title: '',
      author: '',
      url: '',
    }
  }

  componentWillMount() {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.setCurrentUser(user)
    }
  }
  componentDidMount = async () => {
    const blogList = await blogs.getAll()
    const userList = await users.getAll()
    this.props.initBlogs(blogList)
    this.props.initUsers(userList)
  }

  like = (id) => async () => {
    const liked = this.props.blogs.find(b => b._id === id)
    const updated = { ...liked, likes: liked.likes + 1 }

    this.props.voteBlogAction(id, updated)
    this.props.noteChange(`you liked '${updated.title}' by ${updated.author}`)
  }

  remove = (id) => async () => {
    const deleted = this.props.blogs.find(b => b._id === id)
    const ok = window.confirm(`remove blog '${deleted.title}' by ${deleted.author}?`)
    if (ok === false) {
      return
    }

    this.props.deleteBlogAction(id)
    this.props.noteChange(`blog '${deleted.title}' by ${deleted.author} removed`)
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

  logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.props.noteChange('logged out')
    this.props.setCurrentUser(null)
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      this.props.setCurrentUser(user)
      this.props.noteChange('welcome back!')
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.props.noteChange('käyttäjätunnus tai salasana virheellinen', 'error')
    }
  }

  handleLoginChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {

    console.log('App render')

    console.log('current user: ', this.props.user)

    console.log('App state: ', this.state)
    console.log('App redux blogs: ', this.props.blogs)

    if (this.props.user === null) {
      return (
        <div>
          <Notification />
          <h2>Kirjaudu sovellukseen</h2>
          <form onSubmit={this.login}>
            <div>
              käyttäjätunnus
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginChange}
              />
            </div>
            <div>
              salasana
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleLoginChange}
              />
            </div>
            <button type="submit">kirjaudu</button>
          </form>
        </div>
      )
    }

    const byLikes = (b1, b2) => b2.likes - b1.likes

    const blogsInOrder = this.props.blogs.sort(byLikes)

    return (
      <div>
        <Notification notification={this.state.notification} />

        {this.props.user.name} logged in <button onClick={this.logout}>logout</button>

        <Togglable buttonLabel='uusi blogi'>
          <BlogForm
            handleChange={this.handleLoginChange}
            title={this.state.title}
            author={this.state.author}
            url={this.state.url}
            handleSubmit={this.addBlog}
          />
        </Togglable>

        <h2>blogs</h2>
        {blogsInOrder.map(blog =>
          <Blog
            key={blog._id}
            blog={blog}
            like={this.like(blog._id)}
            remove={this.remove(blog._id)}
            deletable={blog.user === undefined || blog.user.username === this.props.user.username}
          />
        )}
      </div>
    );
  }
}


const mapStateToProps = (state) => {

  console.log("MAP STATE TO PROPS: ", state)

  return {
    blogs: state.blogs,
    user: state.user.user,
    users: state.user.users
  }
}
const mapDispatchToProps = {
  noteChange,
  initBlogs,
  initUsers,
  setCurrentUser,
  createBlogAction,
  voteBlogAction,
  deleteBlogAction
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp;