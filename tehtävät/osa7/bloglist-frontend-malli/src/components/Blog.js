import React from 'react'
import { NavLink } from 'react-router-dom'
import { Message } from 'semantic-ui-react'

class Blog extends React.Component {
    constructor() {
        super()
        this.state = {
            visible: false
        }
    }
    render() {
        const { blog } = this.props

        return (
            <Message>
                <NavLink exact to={'/blogs/' + blog._id}>
                    {blog.title} by {blog.author}
                </NavLink>
            </Message>
        )
    }
}

export default Blog