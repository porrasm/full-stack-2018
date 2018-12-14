import blogs from '../services/blogs'

const userReducer = (state = { user: null, users: null }, action) => {

    const newState = state

    switch (action.type) {
        case 'users-init':
            newState.users = action.users
            console.log('Initializing user list to redux: ', newState)
            return newState
        case 'user-set':
            newState.user = action.user
            return newState
        default:
            return state
    }
}
export const setCurrentUser = (user) => {

    if (user) {
        blogs.setToken(user.token)
    } else {
        blogs.setToken(null)
    }

    return async (dispatch) => {
        dispatch({
            type: 'user-set',
            user: user
        })
    }
}
export const initUsers = (users) => {

    console.log('initializing users: ', users)

    return async (dispacth) => {
        dispacth({
            type: 'users-init',
            users: users
        })
    }
}

export default userReducer