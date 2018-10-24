import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                {
                    name: 'Arto Hellas',
                    number: '0123456789'
                }
            ],
            newName: '',
            newNumber: '',
            filter: ''
        }
    }

    nameChange = (event) => {
        console.log("Name change event: ", event.target.value)
        this.setState({ newName: event.target.value })
    }
    numberChange = (event) => {
        console.log("Number change event: ", event.target.value)
        this.setState({ newNumber: event.target.value })
    }
    filterChange = (event) => {
        console.log("Filter change event: ", event.target.value)
        this.setState({ filter: event.target.value })
        this.forceUpdate()
    }

    addNewName = (event) => {

        event.preventDefault()

        if (this.state.newName.length === 0 || this.state.newNumber.length === 0) {
            console.log("Tried to add empty name or number")
            return
        }

        const dupName = this.state.persons.map(person => person.name).includes(this.state.newName)
        const dupNumber = this.state.persons.map(person => person.number).includes(this.state.newNumber)

        if (dupName || dupNumber) {
            console.log("Tried to add duplicate name or number: ", this.state.newName, this.state.newNumber)
            return
        }

        console.log("Adding new person: ", this.state.newName, this.state.newNumber)

        const newPerson = { name: this.state.newName, number: this.state.newNumber }
        const newPersons = this.state.persons.concat(newPerson)


        this.setState({
            persons: newPersons,
            newName: '',
            newNumber: '',
            filter: ''
        })
    }

    render() {

        const names = this.state.persons.map(person => <li key={person.name}>{person.name}</li>)


        

        return (
            <div>
                <h2>Puhelinluettelo</h2>

                <Filter app={this} />

                <h3>Lisää henkilö</h3>

                <AddPerson app={this} />

                <h2>Numerot</h2>

                <Persons app={this} />

            </div>
        )
    }
}

const Filter = ({ app }) => {
    return (
        <div>
            <h3>Rajaa tuloksia</h3>
            <div>Rajaa: <input value={app.state.filter} onChange={app.filterChange} />
            </div>
        </div>
    )
}

const AddPerson = ({ app }) => {
    return (
        <div>
            <form onSubmit={app.addNewName}>
                <div>
                    nimi: <input value={app.state.newName} onChange={app.nameChange} />
                </div>
                <div>
                    numero: <input value={app.state.newNumber} onChange={app.numberChange} />
                </div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>
        </div>
    )
}

const Persons = ({app}) => {

    let persons

        if (app.state.filter.length === 0) {
            persons = app.state.persons.map(person => <tr key={person.name}><td align="left">{person.name}</td><td align="left">{person.number}</td></tr>)
        } else {
            const filtered = app.state.persons.filter(person => person.name.toLowerCase().includes(app.state.filter.toLowerCase()))
            persons = filtered.map(person => <tr key={person.name}><td align="left">{person.name}</td><td align="left">{person.number}</td></tr>)
        }

    return(
        <div>
        <table>
                    <tbody>
                        <tr><th align="left">Nimi</th><th align="left">Numero</th></tr>
                        {persons}
                    </tbody>
                </table>
        </div>
    )
}

export default App