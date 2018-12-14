const notificationReducer = (state = null, action) => {

    console.log("Notification reducer state: ", state)
    console.log("Notification reducer action: ", action)

    switch (action.type) {
        case 'note-change':
            console.log('returning change: ', action.notification)
            return action.notification
        case 'note-reset':
        console.log('returning: reset', null)
            return null
        default:
        console.log('returning: default', state)
            return state
    }
}

export const noteChange = (notification, type) => {

    console.log("Note change ntoe: ", notification)
    console.log("Note change type: ", type)

    const notificationObject = { notification: notification, type: type }

    console.log("Note change object: ", notificationObject)

    return async (dispatch) => {
        setTimeout(() => {
            dispatch(noteReset())
        }, 5000)
        dispatch({
            type: 'note-change',
            notification: notificationObject
        })
    }
}

export const noteReset = () => {

    console.log('in note reset')

    return { type: 'note-reset' }
}

export default notificationReducer