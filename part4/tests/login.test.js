const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const userObject = new User({ username: 'root', passwordHash, id: '622795fdae2d715ab298e3a4', name: 'IamRoot' })
  await userObject.save()
})

describe('get a token with username and password', () => {
  test('login with correct username/password', async () => {
    const credentials = {
      username: 'root',
      password: 'sekret',
    }

    const response = await api
      .post('/api/login')
      .send(credentials)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.token).toBeDefined()
    expect(response.body.username).toEqual('root')
    expect(response.body.name).toEqual('IamRoot')
  })

  test('login with incorrect username', async () => {
    const credentials = {
      username: 'toto',
      password: 'sekret',
    }

    const response = await api
      .post('/api/login')
      .send(credentials)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toEqual('invalid username or password')
  })

  test('login with incorrect password', async () => {
    const credentials = {
      username: 'root',
      password: 'nono',
    }

    const response = await api
      .post('/api/login')
      .send(credentials)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toEqual('invalid username or password')
  })
})

afterAll(() => {
  mongoose.connection.close()
})