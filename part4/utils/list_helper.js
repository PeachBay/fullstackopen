var _ = require('lodash')
const blog = require('../models/blog')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, like) => {
    return sum + like.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  }

  return blogs.reduce(reducer, 0)
}

const mostBlogs = (blogs) => {
  const author = (blog) => blog.author
  const mostAuthorBlogs = _.map(_.countBy(blogs, author), (value, index) => ({ author: index, blogs: value }))

  return _.maxBy(mostAuthorBlogs, 'author')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}