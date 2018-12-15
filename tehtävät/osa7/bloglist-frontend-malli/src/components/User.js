import React from 'react'
import { NavLink } from 'react-router-dom'

const User = ({ user }) => {

    if (!user) {
        return null
    }

    const blogList = user.blogs.map(blog => {
        return (<li key={blog._id}><NavLink exact to={'/blogs/' + blog._id}>
            {blog.title}
        </NavLink></li>)
    })

    return (
        <div>

            <h3>{user.name}</h3>

            <h4>Added blogs</h4>

            <ul>
                {blogList}
            </ul>

        </div>
    )
}

export default User