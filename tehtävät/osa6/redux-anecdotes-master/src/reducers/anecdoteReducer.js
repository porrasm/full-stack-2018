/* eslint-disable no-unused-vars */
import anecdotes from '../services/anecdotes'

const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


console.log('INITIALIZATION OF ANECDOTES')

const anecdoteReducer = (state = [], action) => {

    console.log('REDUCER: action: ', action)

    switch (action.type) {
        case 'create':
            return state.concat(action.data)
        case 'vote':
            return vote(state, action.data.id)
        case 'update':
            return update(state, action.data)
        case 'init':
            return action.data
    }

    return state
}

const createNew = async (state, anecdote) => {

    console.log('REDUCER: Create new: ', anecdote)
    const data = await anecdotes.createNew(anecdote)
    console.log('REDUCR: anecdote data', data)
    return state.concat(data)
}
const vote = (state, id) => {

    console.log('Update a: ', id)

    return state.map(a => {

        if (a.id === id) {
            a.votes++
        }
        return a
    })
}
const update = (state, anecdote) => {
    console.log('Trying to update anecdote state: ')
    return state.filter(a => a.id !== anecdote.id).concat(anecdote)
}


const createActionOld = (anecdote) => {
    return { type: 'create', data: { anecdote } }
}
export const createAction = (anecdote) => {

    console.log('ACTION: Trying to create anecdote: ', anecdote)

    return async (dispatch) => {
        const newAnecdote = await anecdotes.createNew(anecdote)
        console.log('ACTION: Created nre anecdote: ', newAnecdote)
        dispatch({
            type: 'create',
            data: newAnecdote
        })
    }
}

const voteActionOld = (id) => {
    return { type: 'vote', data: { id } }
}
export const voteAction = (anecdote) => {

    return async (dispatch) => {
        const update = await anecdotes.update(anecdote)
        dispatch({
            type: 'create',
            data: update
        })
    }
}

export const initAnecdotes = (data) => {
    return {
        type: 'init',
        data
    }
}

export const updateAnecdote = (data) => {
    return {
        type: 'update',
        data
    }
}

export default anecdoteReducer