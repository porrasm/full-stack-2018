/* eslint-disable no-undef */
import React from 'react'
import { connect } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { noteChange } from '../reducers/notificationReducer'
import Filter from './Filter'


class AnecdoteList extends React.Component {

    render() {

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

    vote = (id) => {

        this.props.voteAction(id)
        let anecdote

        for (let a of this.props.anecdotesToRender) {
            if (a.id === id) {
                anecdote = a
                break
            }
        }

        this.props.noteChange('You voted \'' + anecdote.content + '\'')
    }
}

const anecdotesToRender = (anecdotes, filter) => {

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
    noteChange
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
