import React from 'react';
import actionFor from './actionCreators'

class App extends React.Component {
  render() {

    const anecdotes = this.props.store.getState()
    
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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


  createNew = (event) => {

    console.log("THIS: ", this)

    event.preventDefault()
    const anecdote = event.target.noteInput.value

    console.log("Anecdote: ", anecdote)

    this.props.store.dispatch(actionFor.createNew(anecdote))
  }
  vote = (id) => {
    this.props.store.dispatch(actionFor.vote(id))
  }
}

export default App