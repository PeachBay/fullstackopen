const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')

  return response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(request.user.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user')

  if (request.user.id !==  blog.user._id.toString()) {
    return response.status(403).json({ error: 'You cannot delete a blog you do not own.' })
  }

  await Blog.remove({ _id: request.params.id })

  return response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  if (!request.body.hasOwnProperty('title')) {
    return response.status(400).json({ error: 'Missing title property' })
  }
  if (!request.body.hasOwnProperty('url')) {
    return response.status(400).json({ error: 'Missing url property' })
  }

  const newBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes === undefined ? 0 : request.body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  return response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter