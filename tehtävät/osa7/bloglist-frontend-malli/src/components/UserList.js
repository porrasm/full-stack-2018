import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { noteChange } from '../reducers/notificationReducer'
import { voteBlogAction, deleteBlogAction } from '../reducers/blogReducer'


class UserList extends React.Component {

    componentDidMount() {
        console.log('UserList mount')
    }

    render() {

        console.log('Rendering user list')



        if (!this.props.users) {
            return null
        }

        const byBlogs = (b1, b2) => b2.blogs.length - b1.blogs.length
        const usersInOrder = this.props.users.sort(byBlogs)

        console.log('props: ', this.props)

        return (
            <div>
                <h2>User List</h2>

                <table>
                    <tbody>

                        <tr>
                            <td>User</td>
                            <td>Blogs</td>
                        </tr>

                        {usersInOrder.map(user =>
                            <User user={user} key={user.username} />
                        )}
                    </tbody>
                </table>


            </div>
        )
    }
}

const User = ({ user }) => (
    <tr>
        <th><NavLink exact to={'/users/' + user._id}>{user.name}</NavLink></th>
        <th>{user.blogs.length}</th>
    </tr>
)


const mapStateToProps = (state) => {
    return {
        user: state.userContainer.user,
        users: state.userContainer.users
    }
}
const mapDispatchToProps = {
    noteChange,
    voteBlogAction,
    deleteBlogAction
}

const ConnectedUserList = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList)

export default ConnectedUserList