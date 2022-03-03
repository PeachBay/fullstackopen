const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('blogs contain an id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

describe('add new blog endpoint', () => {

  test('can add a new blog', async () => {
    // Add new blog
    const newBlog = {
      title: 'Falling Alone',
      author: 'Aime',
      url: 'https://reddit.com',
      likes: 15
    }
    const post_response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // Make sure it got an ID assigned
    expect(post_response.body.id).toBeDefined()

    // Remove the ID and make sure the rest of the properties have the right data
    delete post_response.body.id
    expect(post_response.body).toEqual(newBlog)

    // Verify that the total number of blogs has increased by 1
    const get_response = await api.get('/api/blogs')
    expect(get_response.body.length).toEqual(helper.initialBlogs.length + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})