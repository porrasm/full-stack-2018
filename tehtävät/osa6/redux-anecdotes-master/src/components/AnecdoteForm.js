/* eslint-disable no-undef */
import React from 'react'
import { connect } from 'react-redux'
import { createAction } from '../reducers/anecdoteReducer'
import { noteChange } from '../reducers/notificationReducer'
import anecdotes from '../services/anecdotes'

class AnecdoteForm extends React.Component {

    render() {
        return (
            <form href="javascript: false" onSubmit={this.createNew}>
                <div><input name="noteInput" /></div>
                <button>create</button>
            </form>
        )
    }

    createNew = async (event) => {

        console.log('EVENT', event)

        event.preventDefault()
        const anecdote = event.target.noteInput.value
        const anecdoteObject = await anecdotes.createNew(anecdote)
        console.log

        this.props.createAction(anecdoteObject)
        this.props.noteChange('Added ' + anecdote)
    }
}

const mapDispatchToProps = {
    createAction,
    noteChange
}

const ConneectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)

export default ConneectedAnecdoteForm
