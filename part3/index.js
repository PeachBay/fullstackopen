require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.static('build'))

const Person = require('./models/person')

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    req.method === 'POST' ? JSON.stringify(req.body) : ''
  ].join(' ')
}))
app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

/* Home page of the server */
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

/* Get person list */
app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(phonebook => {
    response.json(phonebook.map(person => person.toJSON()))
  })
  .catch(error => next(error))
})

/* Get person id */
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

/* Delete person by id */
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

/* Page for info entries */
app.get('/info', (request, response) => {
  const total = persons.length
  const datetime = new Date()
  response.send(`<p>Phonebook has info for ${total} people</p>` + datetime)
  response.end() 
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

/* Add person */
app.post('/api/persons', (request, response, next) => {
  /* const body = request.body

  if (!body.name || !body.number || undefined != persons.find( ({ name }) => name === body.name )) {
    return response.status(400).json({ 
      error: 'name must be unique'
    })
  } */

  const newPerson = new Person({
    name: request.body.name,
    number: request.body.number
  })

  newPerson.save().then(res => {
    response.json(res)
  })
    .catch(error => next(error))
})

/* Update an existing person */
app.put('/api/persons/:id', (request, response, next) => {
  if (!request.body.name) {
    return response.status(400).json({
      error: 'Name is missing'
    })
  }
  else if (!request.body.number) {
    return response.status(400).json({
      error: 'Number is missing'
    })
  }

  const updatedPerson = {
    name: request.body.name,
    number: request.body.number
  }
  Person.findByIdAndUpdate(request.params.id, updatedPerson, {new: true}).then(result => {
    response.json(result)
  }).catch(error => next(error))
})

/* Error handler */
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})