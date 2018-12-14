import React from 'react'
import { connect } from 'react-redux';

import Blog from './Blog'
import { noteChange } from '../reducers/notificationReducer'
import { voteBlogAction, deleteBlogAction } from '../reducers/blogReducer'


class BlogList extends React.Component {

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

  render() {

    const byLikes = (b1, b2) => b2.likes - b1.likes
    const blogsInOrder = this.props.blogs.sort(byLikes)

    return (
      <div>
          <h2>Blog List</h2>
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
    )
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        blogs: state.blogs
      }
}
const mapDispatchToProps = {
  noteChange,
  voteBlogAction,
  deleteBlogAction
}

const ConnectedBlogList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)

export default ConnectedBlogList