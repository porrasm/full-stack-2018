/* eslint-disable no-undef */
import React from 'react'
import { connect } from 'react-redux'
import { voteAction, updateAnecdote } from '../reducers/anecdoteReducer'
import { noteChange } from '../reducers/notificationReducer'
import Filter from './Filter'
import anecdotes from '../services/anecdotes'


class AnecdoteList extends React.Component {

    render() {

        console.log('anecs to render: ', this.props.anecdotesToRender)

        return (
            <div>
                <Filter/>
                <h2>Anecdotes</h2>
                {this.props.anecdotesToRender.map(anecdote =>
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
            </div>
        )
    }

    vote = async (id) => {

        let anecdote

        for (let a of this.props.anecdotesToRender) {
            if (a.id === id) {
                anecdote = a
                break
            }
        }

        console.log('trying to update: ', anecdote)

        anecdote.votes++
        const updated = await anecdotes.update(anecdote)

        console.log('updated anecdote: ', updated)

        this.props.updateAnecdote(updated)
        this.props.noteChange('You voted \'' + anecdote.content + '\'')
    }
}

const anecdotesToRender = (anecdotes, filter) => {

    console.log('Anecs: ', anecdotes)
    const sorted = anecdotes.sort((a, b) => b.votes - a.votes)


    if (!filter || filter === '') {
        return sorted
    }
    return sorted.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
    return {
        anecdotesToRender: anecdotesToRender(state.anecdotes, state.filter)
    }
}
const mapDispatchToProps = {
    voteAction,
    noteChange,
    updateAnecdote
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
