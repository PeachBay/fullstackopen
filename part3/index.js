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
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(result => {
    if (result) {
      response.json(result)
    }
    else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

/* Delete person by id */
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then( () => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

/* Page for info entries */
app.get('/info', (request, response, next) => {
  Person.countDocuments({}).then(count => {
    let info = `<p>Phonebook has info for ${count} people</p>`
    info += new Date()
    response.send(info)
  }).catch(error => next(error))
})

/* Add person */
app.post('/api/persons', (request, response, next) => {
  const newPerson = new Person({
    name: request.body.name,
    number: request.body.number
  })

  newPerson.save().then(res => {
    response.json(res)
  }).catch(error => next(error))
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
  Person.findByIdAndUpdate(
    request.params.id,
    updatedPerson,
    { new: true, runValidators: true, context: 'query' })
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

/* Error handler */
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})