/* eslint-disable no-undef */
import React from 'react'
import { voteAction, createAction } from './reducers/anecdoteReducer'
import { noteChange } from './reducers/notificationReducer'
import Notification from './components/Notification'
import Filter from './components/Filter'

// <Notification store={this.props.store}/>

class App extends React.Component {
    render() {

        //console.log('nchange action: ', noteChange('asd'))

        const anecdotes = this.anecdotesToRender(this.props.store.getState().anecdotes)

        return (
            <div>
                <h2>Anecdotes</h2>

                <Notification store={this.props.store} />
                <Filter store={this.props.store} />

                {anecdotes.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => this.vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                )}
                <h2>create new</h2>
                <form onSubmit={this.createNew}>
                    <div><input name="noteInput" /></div>
                    <button>create</button>
                </form>
            </div>
        )
    }

    anecdotesToRender = (anecdotes) => {

        const sorted = anecdotes.sort((a, b) => b.votes - a.votes)

        const filter = this.props.store.getState().filter

        if (!filter || filter === '') {
            return sorted
        }
        return sorted.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    }


    createNew = (event) => {

        event.preventDefault()
        const anecdote = event.target.noteInput.value

        const { store } = this.props

        store.dispatch(createAction(anecdote))
        this.addNote('Added ' + anecdote)
    }
    vote = (id) => {

        const { store } = this.props

        store.dispatch(voteAction(id))
        let anecdote

        for (let a of store.getState().anecdotes) {
            if (a.id === id) {
                anecdote = a
                break
            }
        }

        this.addNote('You voted \'' + anecdote.content + '\'')
    }
    addNote = (notification) => {
        this.props.store.dispatch(noteChange(notification))
    }
}

export default App