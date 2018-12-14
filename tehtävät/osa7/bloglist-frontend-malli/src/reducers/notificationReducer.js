const notificationReducer = (state = null, action) => {


    switch (action.type) {
        case 'note-change':
            return action.notification
        case 'note-reset':
            return null
        default:
            return state
    }
}

export const noteChange = (notification, type) => {

    const notificationObject = { notification: notification, type: type }

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

    return { type: 'note-reset' }
}

export default notificationReducer