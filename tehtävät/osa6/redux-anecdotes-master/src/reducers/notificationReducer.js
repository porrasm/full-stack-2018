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

export const noteChange = (notification) => {
    return { type: 'note-change', notification }
}
export const noteReset = () => {

    console.log('in note reset')

    return { type: 'note-reset' }
}

export default notificationReducer