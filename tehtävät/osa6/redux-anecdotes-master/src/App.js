/* eslint-disable no-undef */
import React from 'react'
import { connect } from 'react-redux'
import { voteAction, initAnecdotes } from './reducers/anecdoteReducer'
import { noteChange } from './reducers/notificationReducer'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import anecdotes from './services/anecdotes'

class App extends React.Component {
    componentDidMount = async () => {
        const anecdoteArray = await anecdotes.getAll()

        console.log('Anec array in mouint: ', anecdoteArray)
        this.props.initAnecdotes(anecdoteArray)
    }

    render() {

        return (
            <div>
                <h2>Anecdotes</h2>

                <Notification store={this.props.store} />

                <AnecdoteList/>
                <h2>create new</h2>
                <AnecdoteForm createNew={this.createNew} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}
const mapDispatchToProps = {
    voteAction,
    noteChange,
    initAnecdotes
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default ConnectedApp