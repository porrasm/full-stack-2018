import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import noteReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
    notification: noteReducer,
    blogs: blogReducer,
    userContainer: userReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store