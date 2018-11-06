import React from 'react'

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

const Persons = ({ app }) => {

    let persons

    if (app.state.filter.length === 0) {
        persons = PersonsToTable(app.state.persons, app)
    } else {
        const filtered = app.state.persons.filter(person => person.name.toLowerCase().includes(app.state.filter.toLowerCase()))
        persons = PersonsToTable(filtered, app)
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th align="left">Nimi</th>
                        <th align="left">Numero</th>
                        <th align="left">Poista</th>
                    </tr>
                    {persons}
                </tbody>
            </table>
        </div>
    )
}

const Notification = ({note}) => {

    if (note === null || note === '') {
        return null
    }

    return (
        <div className="notification">{note}</div>
    )
}

const PersonsToTable = (persons, app) => {
    return persons.map(person => 
    <tr key={person.name}>
        <td align="left">{person.name}</td>
        <td align="left">{person.number}</td>
        <td align="left"><button onClick={ () => app.deletePerson(person.id)}>poista</button></td>
    </tr>)
}

export default {Filter, AddPerson, Persons, Notification}