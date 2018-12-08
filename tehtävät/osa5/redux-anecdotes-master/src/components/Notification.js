/* eslint-disable no-undef */
import React from 'react'
import { noteReset } from '../reducers/notificationReducer'

class Notification extends React.Component {

    componentDidMount() {

        const store = this.props.store
        console.log('TEST')

        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        )
    }
    componentDidUpdate() {

        console.log('COMPONENT UPDATE')

        if (!this.props.store.getState().notification) {
            return
        }

        setTimeout(() => {
            this.props.store.dispatch(noteReset())
        }, 5000)
    }
    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        const style = {
            border: 'solid',
            padding: 10,
            borderWidth: 1
        }

        const notification = this.props.store.getState().notification

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

export default Notification