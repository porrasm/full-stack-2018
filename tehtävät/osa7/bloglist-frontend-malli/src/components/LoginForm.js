import React from 'react'
import { connect } from 'react-redux';

import { noteChange } from '../reducers/notificationReducer'
import { setCurrentUser } from '../reducers/userReducer'
import loginService from '../services/login'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
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

    logout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        this.props.noteChange('logged out')
        this.props.setCurrentUser(null)
    }

    render() {

        console.log('USER STATUS FORM: ', this.props.user)

        if (this.props.user) {
            return (<div>
                {this.props.user.name} logged in <button onClick={this.logout}>logout</button>
            </div>)
        }

        return (
            <div>
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
    handleLoginChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
}
const mapDispatchToProps = {
    noteChange,
    setCurrentUser
}


const ConnectedLoginForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm)

export default ConnectedLoginForm;