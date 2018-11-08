import React from 'react';
import Components from './components/comps';
import personsSVC from './services/persons';
import './app.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            notification: ''
        }
    }

    componentDidMount() {
        console.log('Did mount.')

        personsSVC
            .getAll()
            .then(persons => {
                this.setState({ persons })
            })
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

        console.log('Add new name')

        event.preventDefault();

        if (this.state.newName.length === 0 || this.state.newNumber.length === 0) {
            console.log("Tried to add empty name or number")
            return
        }

        const dupName = this.state.persons.map(person => person.name).includes(this.state.newName)
        const dupNumber = this.state.persons.map(person => person.number).includes(this.state.newNumber)

        if (dupName && dupNumber) {
            console.log("Tried to add duplicate name or number: ", this.state.newName, this.state.newNumber)
            return
        } else if (dupName) {
            this.updatePerson()
            return
        }

        console.log("Adding new person: ", this.state.newName, this.state.newNumber)

        const newPerson = { name: this.state.newName, number: this.state.newNumber }

        personsSVC.create(newPerson).then(newPerson => {
            console.log("Response: ", newPerson)

            
        })

        this.removeNotification();
    }
    updatePerson = () => {

        const person = this.state.persons.filter(person => person.name === this.state.newName)[0]
        console.log("Updateing person: ", person)
        const newPerson = { name: person.name, number: this.state.newNumber }
        console.log("Replacing with: ", newPerson)

        if (!window.confirm("Haluatko korvata henkilön ", person.name, " numeron?")) {
            return;
        }

        try {
            
        } catch (error) {
            
        }

        personsSVC
            .update(person.id, newPerson)
            .then(changedPerson => {
                const newPersons = this.state.persons.filter(p => p.id !== person.id)
                this.setState({
                    persons: newPersons.concat(changedPerson), notification: "Päivitettiin " + person.name + "n numero."
                })
            })
            .catch(error => {
                personsSVC.create(newPerson).then(newPerson => {
                    console.log("Response: ", newPerson)

                    const newPersons = this.state.persons.map(person => {
                        if (person.name === newPerson.name) {
                            person.number = newPerson.number
                        }
                        return person
                    })

                    this.setState({persons: newPersons})
                })

            })

        this.removeNotification();
    }

    deletePerson = (id) => {

        if (!window.confirm("Haluatko poistaa henkilön?")) {
            return
        }

        console.log("delete person")
        personsSVC.deletePerson(id)
            .then(person => {
                const filtered = this.state.persons.filter(person => person.id !== id)

                this.setState({ persons: filtered, notification: 'Poistettiin henkilö ' })
            })

        this.removeNotification()
    }

    removeNotification = () => {

        console.log("removing notification...")

        setTimeout(() => {
            this.setState({notification: null})
          }, 5000)
    }

    render() {

        return (
            <div>
                <h2>Puhelinluettelo</h2>

                <Components.Notification note={this.state.notification} />

                <Components.Filter app={this} />

                <h3>Lisää henkilö</h3>

                <Components.AddPerson app={this} />

                <h2>Numerot</h2>

                <Components.Persons app={this} />

            </div>
        )
    }
}

export default App