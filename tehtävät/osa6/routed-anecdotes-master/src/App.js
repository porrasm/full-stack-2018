import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Table, Container, Message, Menu, Form, Button } from 'semantic-ui-react'


const Menus = () => {

    return (

        <Menu inverted>
            <Menu.Item link>
                <NavLink exact to="/">Anecdotes</NavLink> &nbsp;
            </Menu.Item>
            <Menu.Item link>
                <NavLink exact to="/anecdotes/detailed">Detailed anecdotes</NavLink> &nbsp;
            </Menu.Item>
            <Menu.Item link>
                <NavLink exact to="/create">Create New</NavLink> &nbsp;
            </Menu.Item>
            <Menu.Item link>
                <NavLink exact to="/about">About</NavLink> &nbsp;
            </Menu.Item>
        </Menu>
    )
}
const Items = ({ anecdotes, addNew, anecdoteById }) => (
    <div>
        <Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes} />} />
        <Route exact path="/anecdotes/detailed" render={() => <AnecdoteListDetailed anecdotes={anecdotes} />} />
        <Route path="/create" render={() => <CreateNewRouted addNew={addNew} />} />
        <Route path="/about" render={() => <About />} />
        <Route exact path="/anecdotes/:id" render={({ match }) =>
            <Anecdote anecdote={anecdoteById(match.params.id)} />} />
        <Footer />
    </div>
)

const AnecdoteList = ({ anecdotes }) => (
    <div>
        <h2>Anecdotes</h2>

        <Table>
            <Table.Body>
                {anecdotes.map(anecdote =>

                    <Table.Row key={anecdote.id}>
                        <Table.Cell>
                            <NavLink exact to={`anecdotes/${anecdote.id}`} key={anecdote.id} >{anecdote.content}</NavLink>
                        </Table.Cell>
                    </Table.Row>)}
            </Table.Body>
        </Table>
    </div>
)
const AnecdoteListDetailed = ({ anecdotes }) => {

    console.log("anecs: ", anecdotes)

    const anecdoteRows = anecdotes.map(anecdote =>

        <Table.Row key={anecdote.id}>
            <Table.Cell>
                <Anecdote anecdote={anecdote} />
            </Table.Cell>
        </Table.Row>)

    console.log("anec rows: ", anecdoteRows)

    return (
        <div>
            <h2>Anecdotes</h2>

            <Table>
                <Table.Body>
                    {anecdoteRows}
                </Table.Body>
            </Table>
        </div>
    )
}

const Anecdote = ({ anecdote }) => {

    console.log('In anecdote: ', anecdote)

    if (!anecdote) {
        return null
    }

    let info

    if (anecdote.info) {
        info = (<p>For more info see <a href={anecdote.info}>{anecdote.info}</a></p>)
    }

    

    return (
        <div>
            <Message>
                <Message.Header>{anecdote.author}:</Message.Header>
                <p style={{ fontSize: 20 }}>{'"' + anecdote.content + '"'}</p>
                <p>Votes: {anecdote.votes}</p>
                <p>{info}</p>
            </Message>
        </div>
    )
}

const About = () => (
    <div>

        <Table>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        <h2>About anecdote app</h2>
                        <Message>
                            <Message.Header>According to Wikipedia</Message.Header>
                            <p style={{ fontSize: 20 }}>
                                An anecdote is a brief, revealing account of an individual person or an incident.
                            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
                            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
                             An anecdote is "a story with a point."
                                </p>
                        </Message>
                        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
                    </Table.Cell>
                    <Table.Cell>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg"
                            width="300"
                            height="auto"></img>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    </div>
)

const Footer = () => (
    <div>
        Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)


class CreateNew extends React.Component {
    constructor() {
        super()
        this.state = {
            content: '',
            author: '',
            info: ''
        }
    }

    handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addNew({
            content: this.state.content,
            author: this.state.author,
            info: this.state.info,
            votes: 0
        })
        this.props.history.push('/')
    }

    render() {
        return (

            <div>
                <h2>Add a new anecdote</h2>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>Anecdote</label>
                        <input name="content" />
                    </Form.Field>
                    <Form.Field>
                        <label>Author</label>
                        <input name="author" />
                    </Form.Field>
                    <Form.Field>
                        <label>URL for more info</label>
                        <input name="info" />
                    </Form.Field>
                    <Button type="submit">Add anecdote</Button>
                </Form>
            </div>
        )
    }
}
const CreateNewRouted = withRouter(CreateNew)

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            anecdotes: [
                {
                    content: 'If it hurts, do it more often',
                    author: 'Jez Humble',
                    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
                    votes: 0,
                    id: '1'
                },
                {
                    content: 'Premature optimization is the root of all evil',
                    author: 'Donald Knuth',
                    info: 'http://wiki.c2.com/?PrematureOptimization',
                    votes: 0,
                    id: '2'
                }
            ],
            notification: '',
        }
    }

    addNew = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0)
        this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
        this.addNote('Added \'' + anecdote.content + '\'')
    }

    anecdoteById = (id) =>
        this.state.anecdotes.find(a => a.id === id)

    vote = (id) => {
        const anecdote = this.anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

        this.setState({ anecdotes })
        this.addNote('Voted \'' + anecdote.content + '\'')
    }
    addNote(notification) {
        this.setState({ notification })
        setTimeout(() => {
            this.setState({ notification: '' })
        }, 10000)
    }

    render() {

        let note

        if (this.state.notification) {
            note = (<Notification notification={this.state.notification} />)
        }

        return (
            <Container>
                <h1>Software anecdotes</h1>

                <Router>
                    <div>
                        <Menus />
                        {note}
                        <Items anecdotes={this.state.anecdotes} addNew={this.addNew} anecdoteById={this.anecdoteById} />
                    </div>
                </Router>

            </Container>
        );
    }
}


const Notification = ({ notification }) => {

    const style = {
        width: 500,
        outlineStyle: 'solid',
        backgroundColor: 'orange',
        textAlign: 'center',
        fontSide: '30'
    }

    return (
        <div>
            <h2>Note</h2>
            <h3 style={style}>{notification}</h3>
        </div>

    )
}

export default App;
