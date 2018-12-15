import React from 'react'
import { NavLink } from 'react-router-dom'

class Blog extends React.Component {
    constructor() {
        super()
        this.state = {
            visible: false
        }
    }
    render() {
        const { blog } = this.props

        const blogStyle = {
            paddingTop: 10,
            paddingLeft: 2,
            border: 'solid',
            borderWidth: 1,
            marginBottom: 5
        }


        return (
            <div style={blogStyle}>
                <NavLink exact to={'/blogs/' + blog._id}>
                    {blog.title} by {blog.author}
                </NavLink>
            </div>
        )
    }
}

export default Blog