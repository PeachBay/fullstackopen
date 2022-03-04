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

describe('add new blog', () => {
  test('can add a new blog', async () => {
    // Add new blog
    const newBlog = {
      title: 'ONION!',
      author: 'ONE OK ROCK',
      url: 'https://reddit.com',
      likes: 8
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

describe('deletion of one blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    console.log(blogsAtEnd)

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(r => r.content)

    expect(contents).not.toContain(blogToDelete.content)
  })
})

afterAll(() => {
  mongoose.connection.close()
})