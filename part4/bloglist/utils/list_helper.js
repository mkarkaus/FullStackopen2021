const _ = require('lodash')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {

	const reducer = (sum, item) => {
		return sum + (item.likes ? item.likes : 0)
	}
	const total = blogs.reduce(reducer, 0)

	return total
}

const favoriteBlog = (blogs) => {
	if (blogs.find(blog => blog.likes !== undefined) === undefined)
		return ({})
	const reducer = (accumulator, blog) => (blog.likes >= accumulator.likes)
			? blog
			: accumulator

	const result = blogs.reduce(reducer, { likes: 0 })

	return {
		title: result.title,
		author: result.author,
		likes: result.likes
	}
}

const mostBlogs = (blogs) => {

	const reducer = (acc, blogs, key) => {
		let pair = {
			'author': key,
			'blogs': blogs
		}
		const result = (blogs >= acc.blogs)
			? pair
			: acc
		return result
	}

	const blogCounts = _(blogs)
		.groupBy('author')
		.mapValues(_.size)
		.reduce(reducer, {blogs: 0})

	return blogCounts
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs
}
