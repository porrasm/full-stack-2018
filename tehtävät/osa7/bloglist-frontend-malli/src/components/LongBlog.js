import React from 'react'
import { connect } from 'react-redux'

import { noteChange } from '../reducers/notificationReducer'
import { voteBlogAction, deleteBlogAction, commentBlogAction } from '../reducers/blogReducer'
import { Table, Message } from 'semantic-ui-react'

class LongBlog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: ''
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
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

    comment = (event) => {
        event.preventDefault()

        this.props.commentBlogAction(this.props.blog._id, this.state.comment)

        this.setState({ comment: '' })
    }

    render() {
        const blog = this.props.blog
        console.log('BLOG: ', blog)

        if (!blog) {
            console.log('Blog is null')
            return null
        }

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
                    <Table>
                        <Table.Body>
                            <Message>
                                <Message.Content>
                                    <div>
                                        <a href={blog.url}>{blog.url}</a>
                                    </div>
                                </Message.Content>
                                <Message.Content>
                                    <div>
                                        <a href={blog.url}>{blog.url}</a>
                                    </div>
                                </Message.Content>
                                <Message.Content>
                                    <div>
                                        {blog.likes} likes <button onClick={like}>like</button>
                                    </div>
                                </Message.Content>
                                <Message.Content>
                                    <div>
                                        added by {adder}
                                    </div>
                                </Message.Content>
                                <Message.Content>
                                    {deletable && <div><button onClick={remove}>delete</button></div>}
                                </Message.Content>
                            </Message>
                        </Table.Body>
                    </Table>
                </div>

                <h3>Comments</h3>
                <form onSubmit={this.comment}>
                    <div>Add comment
                        <input
                            value={this.state.comment}
                            name='comment'
                            onChange={this.handleChange}
                        />
                    </div>

                    <button>submit</button>
                </form>
                <Comments comments={blog.comments} />


            </div>
        )
    }
}

const Comments = ({ comments }) => {

    return (
        <Message>
            <Message.List items={comments} />
        </Message>
    )
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
    deleteBlogAction,
    commentBlogAction
}

const ConnectedLongBlog = connect(
    mapStateToProps,
    mapDispatchToProps
)(LongBlog)

export default ConnectedLongBlog