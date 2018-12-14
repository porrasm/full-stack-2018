import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';

import { noteChange } from '../reducers/notificationReducer'
import { voteBlogAction, deleteBlogAction } from '../reducers/blogReducer'

class LongBlog extends React.Component {

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
        const blog = this.props.blog

        const key = blog._id
        const like = this.like(blog._id)
        const remove = this.remove(blog._id)
        const deletable = blog.user === undefined || blog.user.username === this.props.user.username

        const blogStyle = {
            paddingTop: 10,
            paddingLeft: 2,
            border: 'solid',
            borderWidth: 1,
            marginBottom: 5
        }

        const contentStyle = {
            margin: 5,
        }

        const adder = blog.user ? blog.user.name : 'anonymous'

        return (
            <div style={blogStyle}>
                <h2>
                    {blog.title} by {blog.author}
                </h2>
                <div style={contentStyle} className='content'>
                    <div>
                        <a href={blog.url}>{blog.url}</a>
                    </div>
                    <div>
                        {blog.likes} likes <button onClick={like}>like</button>
                    </div>
                    <div>
                        added by {adder}
                    </div>
                    {deletable && <div><button onClick={remove}>delete</button></div>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        user: state.userContainer.user,
        blogs: state.blogs
      }
}
const mapDispatchToProps = {
  noteChange,
  voteBlogAction,
  deleteBlogAction
}

const ConnectedLongBlog = connect(
  mapStateToProps,
  mapDispatchToProps
)(LongBlog)

export default ConnectedLongBlog