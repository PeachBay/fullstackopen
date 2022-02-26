const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, like) => {
    return sum + like.likes
  }

  return blogs.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes
}