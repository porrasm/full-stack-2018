/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import { connect } from 'react-redux'
import anecdoteReducer, { initAnecdotes } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import anecdotes from './services/anecdotes'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
})

const store = createStore(reducer)
/*
anecdotes.getAll().then(anecdotes =>
    store.dispatch(initAnecdotes(anecdotes))
)
*/

console.log('STORE ALKU: ', store)

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root'))
}

render()
store.subscribe(render)