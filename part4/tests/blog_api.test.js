const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')

let token = undefined

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  let user = new User({ username: 'root', passwordHash, _id: '622795fdae2d715ab298e3a4' })
  await user.save()

  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  token = jwt.sign(userForToken, process.env.SECRET)
})

describe('get list of blogs', () => {
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

  test('blogs contain a user', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
      expect(blog.user).toBeDefined()
    })
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
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const expectedResponse = { ...newBlog, user: '622795fdae2d715ab298e3a4' }

    // Make sure it got an ID assigned
    expect(post_response.body.id).toBeDefined()

    // Remove the ID and make sure the rest of the properties have the right data
    delete post_response.body.id
    expect(post_response.body).toEqual(expectedResponse)

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
      .set('authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('returns forbidden if blog is not owned by user', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const userForToken = {
      username: 'root-2',
      id: 'anotherid',
    }

    token = jwt.sign(userForToken, process.env.SECRET)

    const response = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', `bearer ${token}`)
      .expect(403)

    expect(response.body.error).toEqual('You cannot delete a blog you do not own.')

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).toContain(blogToDelete.title)
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
    const expectedResponse = { ...newBlog, user: '622795fdae2d715ab298e3a4' }
    const response = await api.put('/api/blogs/' + blogsAtStart[0].id).send(newBlog)

    expect(response.body.id).toBe(blogsAtStart[0].id)

    delete response.body.id
    expect(response.body).toEqual(expectedResponse)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)

    delete blogsAtEnd[0].id
    delete blogsAtEnd[0].user
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