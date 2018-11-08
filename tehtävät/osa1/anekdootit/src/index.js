import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            scores: [0, 0, 0, 0, 0, 0]
        }
    }

    NextAnecdote = (selected) => {

        let newSelected = Math.floor(Math.random() * (anecdotes.length - 1))

        if (newSelected >= selected) {
            newSelected++
        }

        return () => {
            this.setState({ selected: newSelected })
        }
    }

    Vote = (prevScores, selected) => {

        console.log('Button pressed');
        this.forceUpdate()

        prevScores[selected] = prevScores[selected] + 1

        return () => {
            this.setState({ scores: prevScores })
        }
    }


    render() {

        const onClick = () => this.Vote(this.state.scores, this.state.selected)

        return (
            <div>
                <p>{this.props.anecdotes[this.state.selected]}</p>
                <p>this anecdote has {this.state.scores[this.state.selected]} votes</p>
                <Button onClick={this.NextAnecdote(this.state.selected)} teksti="next anecdote" />
                <Button onClick={onClick} teksti="vote" />
                <Best scores={this.state.scores} />
            </div>
        )
    }
}

const Best = ({scores}) => {

    let best
    let score = 0

    for (let i = 0; i < scores.length; i++) {

        if (scores[i] > score) {
            best = anecdotes[i]
            score = scores[i]
        }

    }

    if (score === 0) {
        return (
            <div>
                <h1>Anecdote with most votes:</h1>
                <p>No votes</p>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Anecdote with most votes:</h1>
                <p>Anecdote: {best}</p>
                <p>Has {score} votes</p>
            </div>
        )
    }

}

const Button = ({ onClick, teksti }) => (
    <button onClick={onClick}>
        {teksti}
    </button>
)

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)