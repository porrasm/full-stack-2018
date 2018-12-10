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

const noteChangeOld = (notification) => {
    return { type: 'note-change', notification }
}
export const noteChange = (notification, time) => {

    console.log('ACTION: Trying to create anecdote: ', notification)

    

    return async (dispatch) => {
        setTimeout(() => {
            dispatch(noteReset())
        }, time * 1000)
        dispatch({
            type: 'note-change',
            notification
        })
    }
}

export const noteReset = () => {

    console.log('in note reset')

    return { type: 'note-reset' }
}

export default notificationReducer