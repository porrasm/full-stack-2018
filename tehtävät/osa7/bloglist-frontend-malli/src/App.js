import React from 'react'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

import { noteChange } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import { setCurrentUser, initUsers } from './reducers/userReducer'
import { connect } from 'react-redux';
import blogs from './services/blogs'
import users from './services/users'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

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
    this.props.initBlogs(blogList)
    this.props.initUsers(userList)
  }


  logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.props.noteChange('logged out')
    this.props.setCurrentUser(null)
  }

  render() {
    if (this.props.user === null) {
      return (
          <LoginForm login={this.login}/>
      )
    }


    return (
      <div>
        <Notification />

        <LoginForm />

        <Togglable buttonLabel='uusi blogi'>
          <BlogForm />
        </Togglable>

        <BlogList />
      </div>
    );
  }
}


const mapStateToProps = (state) => {

  console.log("MAP STATE TO PROPS: ", state)

  return {
    user: state.user.user,
    users: state.user.users,
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