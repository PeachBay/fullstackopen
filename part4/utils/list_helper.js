var _ = require('lodash')

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

const mostLikes = (blogs) => {
  const topAuthor = _.chain(blogs)
    .groupBy('author')
    .map((group, author) => {
      return {
        author: author,
        likes: group.reduce((acc, next) => {
          return (acc += next.likes)
        }, 0),
      }
    })
    .maxBy((object) => object.likes)
    .value()

  return topAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}