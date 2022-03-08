const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')

  return response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username || !password) {
    return response.status(400).json({ error: 'Please provide both username and password.' }).end()
  }

  if (username.length < 3) {
    return response.status(400).json({ error: 'Username must be at least 3 characters long.' }).end()
  }

  if (password.length < 3) {
    return response.status(400).json({ error: 'Password must be at least 3 characters long.' }).end()
  }

  const existingUser = await User.findOne({ username: username })
  if ( existingUser !== null ) {
    return response.status( 400 ).json({ error: 'Username must be unique' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter