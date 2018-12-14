import users from '../services/users'
import blogs from '../services/blogs'

const userReducer = (state = { user: null, users: null }, action) => {

    const newState = state

    switch (action.type) {
        case 'uses-init':
            newState.users = action.data
            return newState
        case 'user-set':
            console.log('user set: ', action)
            newState.user = action.data
            return newState
        default:
            return state
    }
}

export const getOneUserAction = (id) => {

    return async (dispatch) => {
        dispatch({
            type: 'user-get-all',
            id
        })
    }
}
export const getAllUsersAction = () => {

    return async (dispatch) => {
        dispatch({
            type: 'user-get-all'
        })
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
            data: user
        })
    }
}
export const initUsers = (users) => {

    console.log('Initializing users from action: ', users)

    return async (dispacth) => {
        dispacth({
            type: 'users-init',
            data: users
        })
    }
}

export default userReducer