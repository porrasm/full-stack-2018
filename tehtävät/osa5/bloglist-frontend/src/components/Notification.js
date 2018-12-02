import React from 'react'

const Notification = ({note}) => {

    if (note === null || note === '') {
        return null
    }

    return (
        <div className="notification">{note}</div>
    )
}

export default Notification