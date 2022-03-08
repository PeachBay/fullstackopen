const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')

beforeEach(async () => {
  await blog.deleteMany({})

  let blogObject = new blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new blog(helper.initialBlogs[1])
  await blogObject.save()
  blogObject = new blog(helper.initialBlogs[2])
  await blogObject.save()
})

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

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('update blog', () => {

  test('update an existing blog', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'Go brrrrrrr',
      author: 'Hime',
      url: 'http://reddit.com',
      likes: 100,
    }
    const response = await api.put('/api/blogs/' + blogsAtStart[0].id).send(newBlog)

    expect(response.body.id).toBe(blogsAtStart[0].id)

    delete response.body.id
    expect(response.body).toEqual(newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)

    delete blogsAtEnd[0].id
    expect(blogsAtEnd[0]).toEqual(newBlog)
  })

  test('cannot update without title', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      author: 'Hime',
      url: 'http://reddit.com'
    }
    const response = await api.put('/api/blogs/' + blogsAtStart[0].id).send(newBlog)

    expect(response.body.error).toBeDefined()

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })

  test('cannot update without url', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'Not working',
      author: 'Hime'
    }
    const response = await api.put('/api/blogs/' + blogsAtStart[0].id).send(newBlog)

    expect(response.body.error).toBeDefined()

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })

  test('update an existing blog without likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      title: 'Add blog',
      author: 'Hime',
      url: 'https://reddit.com'
    }
    const response = await api.put('/api/blogs/' + blogsAtStart[0].id).send(newBlog)

    expect(response.body.likes).toBe(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})