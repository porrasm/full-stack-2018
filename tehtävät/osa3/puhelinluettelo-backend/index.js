const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var cors = require('cors')
var morgan = require('morgan')


morgan.token('content', function(req, res) {
    const string = JSON.stringify(req.body)
    return string})
morgan.token('type', function (req, res) { return req.headers['content-type'] })

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

let persons = [
    {
        name: "aa",
        number: "1",
        id: 1
    },
    {
        name: "b",
        number: "2",
        id: 2
    },
    {
        name: "c",
        number: "3",
        id: 3
    },
    {
        name: "d",
        number: "4",
        id: 4
    }
]

generateId = () => {

    let highest = 0

    persons.forEach(p => {
        if (p.id > highest) {
            highest = p.id
        }
    })

    return highest + 1
}

app.get('/info', (req, res) => {

    const message = `<p>Luettelossa on ${persons.length} henkilön tiedot</p>
                    <p>${new Date()}</p>`

    res.send(`<p>${message}<p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.post('/api/persons', (req, res) => {

    const body = req.body

    if (body.name === undefined || body.number === undefined) {
        return res.status(400).json({error: 'content missing'})
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    const dupName = persons.map(p => p.name).includes(person.name)
    const dupNumber = persons.map(p => p.number).includes(person.number)

    if (dupName || dupNumber) {
        return res.status(400).json({error: 'name and number must be unique'})
    }

    persons = persons.concat(person)

    res.json(person)
})

app.get('/api/persons/:id', (req, res) => {

    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {

    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})