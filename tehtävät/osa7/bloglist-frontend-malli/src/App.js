import React from 'react'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import User from './components/User'
import LongBlog from './components/LongBlog'

import { Menu } from 'semantic-ui-react'

import { noteChange } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import { setCurrentUser, initUsers } from './reducers/userReducer'
import { connect } from 'react-redux';
import blogs from './services/blogs'
import users from './services/users'

import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'

class App extends React.Component {

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

    console.log('App Mount')

    await this.props.initUsers(userList)
    await this.props.initBlogs(blogList)
  }

  userById = (id) => {
    for (let user of this.props.users) {
      if (user._id === id) {
        return user
      }
    }

    return null
  }
  blogById = (id) => {
    for (let blog of this.props.blogs) {
      if (blog._id === id) {
        return blog
      }
    }

    return null
  }

  render() {

    console.log('USER STATUS: ', this.props.user)
    console.log('USERS STATUS: ', this.props.users)

    if (this.props.user === null) {
      return (
        <LoginForm login={this.login} />
      )
    }

    const Menus = () => (
      <div>
        <Menu inverted>
            <Menu.Item link>
                <Link to="/">home</Link>
            </Menu.Item>
            <Menu.Item link>
                <Link to="/users">users</Link>
            </Menu.Item>
        </Menu>
      </div>
    )

    const InfoView = () => (
      <div>
        <Menus />
        <LoginForm />
        <Notification />
      </div>
    )
    const MainView = () => (
      <div>
        <Togglable buttonLabel='uusi blogi'>
          <BlogForm />
        </Togglable>

        <BlogList />
      </div>
    )
    const UserView = () => (
      <div>
        <UserList />
      </div>
    )

    

    return (
      <div>
        <Router>
          <div>

            <InfoView />

            <Route exact path="/" render={() => <MainView />} />
            <Route exact path="/users" render={() => <UserView />} />
            <Route exact path="/users/:id" render={({ match }) =>
              <User user={this.userById(match.params.id)} />} />
          <Route exact path="/blogs/:id" render={({ match }) =>
              <LongBlog blog={this.blogById(match.params.id)} />} />
          </div>
        </Router>
      </div>
    );
  }
}




const mapStateToProps = (state) => {

  console.log('App mapState: ', state)

  return {
    user: state.userContainer.user,
    users: state.userContainer.users,
    blogs: state.blogs
  }
}
const mapDispatchToProps = {
  noteChange,
  initBlogs,
  initUsers,
  setCurrentUser
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp;