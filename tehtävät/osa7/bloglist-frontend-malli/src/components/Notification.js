import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {

  render() {

    console.log('Rendering notification: ', this.props.notification)

    if (!this.props.notification) {
      return null
    }

    const type = this.props.notification.type ? this.props.notification.type : 'info'

    return (
      (
        <div className={type}>
          {this.props.notification.notification}
        </div>
      )
    )
  }
}

const mapStateToProps = (state) => {

  console.log('map state: ', state.notification)

  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification