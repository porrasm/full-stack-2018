/* eslint-disable no-undef */
import React from 'react'
import { noteReset } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class Notification extends React.Component {

    componentDidUpdate() {

        console.log('NOTIFICATION UPDATE')

        if (!this.props.notification) {
            return
        }

        setTimeout(() => {
            this.props.noteReset()
        }, 5000)
    }

    render() {
        const style = {
            border: 'solid',
            padding: 10,
            borderWidth: 1
        }

        const notification = this.props.notification

        if (!notification) {
            return null
        }

        return (
            <div style={style}>
                {notification}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}
const mapDispatchToProps = {
    noteReset
}

const ConnectedNotification = connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification)

export default ConnectedNotification