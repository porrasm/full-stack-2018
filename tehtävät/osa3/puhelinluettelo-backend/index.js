const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Person = require('./models/person')


var cors = require('cors')
var morgan = require('morgan')


morgan.token('content', function(req, res) {
    const string = JSON.stringify(req.body)
    return string})
morgan.token('type', function (req, res) { return req.headers['content-type'] })

const oldPersons = {}

const morganSettings = morgan(function (tokens, req, res) {

    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens['content'](req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
})

app.use(bodyParser.json())
app.use(cors())
app.use(morganSettings)
app.use(express.static('build'))


generateId = () => {

    let highest = 0

    oldPersons.forEach(p => {
        if (p.id > highest) {
            highest = p.id
        }
    })

    return highest + 1
}

app.get('/info', (req, res) => {

    Person
        .find({})
        .then(result => {
            const message = `<p>Luettelossa on ${result.length} henkilön tiedot</p>
                    <p>${new Date()}</p>`

    res.send(`<p>${message}<p>`)
        })

    return
    
    const message = `<p>Luettelossa on ${oldPersons.length} henkilön tiedot</p>
                    <p>${new Date()}</p>`

    res.send(`<p>${message}<p>`)
})

app.get('/api/persons', (req, res) => {
    Person 
        .find({})
        .then(result => {
            res.json(result.map(Person.format))
        })
})

app.post('/api/persons', (req, res) => {

    console.log("HTTP POST")

    const body = req.body

    if (body.name === undefined || body.number === undefined) {
        return res.status(400).json({error: 'content missing'})
    }

    const person = new Person({
        name: body.name,
        number: body.number
    }) 

    Person
        .find({name: person.name})
        .then(result => {
            if (result.length === 0) {
                console.log('Adding person')
                addPersonToDatabase(res, person)
            }
        })

    return

    const dupName = oldPersons.map(p => p.name).includes(person.name)
    const dupNumber = oldPersons.map(p => p.number).includes(person.number)

    if (dupName || dupNumber) {
        return res.status(400).json({error: 'name and number must be unique'})
    }

    oldPersons = oldPersons.concat(person)

    res.json(person)
})

const addPersonToDatabase = (res, person) => {
    person
        .save()
        .then(result => {
            res.json(formatPerson(result))
        })
}

app.put('/api/persons/:id', (req, res) => {

    console.log("HTTP put")

    const body = req.body

    const newPerson = {
        name: body.name,
        number: body.number
    }

    Person
        .findByIdAndUpdate(req.params.id, newPerson)
        .then(updPerson => {
            res.json(formatPerson(updPerson))
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({error: 'malformatted id'})
        })
})

app.get('/api/persons/:id', (req, res) => {

    Person
        .findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(formatPerson(person))
            } else {
                res.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({error: 'malformatted id'})
        })

    return

    const id = Number(req.params.id)
    const person = oldPersons.find(p => p.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {

    Person
        .findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => {
            res.status(400).send({error: 'malformatted id'})
        })

    return;
    oldPersons = oldPersons.filter(p => p.id !== id)

    res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const formatPerson = (person) => {
    return({
        name: person.name,
        number: person.number,
        id: person._id
    })
}