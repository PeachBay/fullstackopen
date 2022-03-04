const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Travel',
    author: 'BOL4',
    url: 'https://reddit.com',
    likes: 5
  },
  {
    title: 'Falling Alone',
    author: 'Aime',
    url: 'https://reddit.com',
    likes: 15
  },
  {
    title: 'ONION!',
    author: 'ONE OK ROCK',
    url: 'https://reddit.com',
    likes: 8
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}