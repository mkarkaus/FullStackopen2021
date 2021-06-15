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
		const pair = {
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

const mostLikes = (blogs) => {
	const reducer = (acc, likes, key) => {
		const pair = {
			'author': key,
			'likes': likes
		}
		const result = (likes >= acc.likes)
			? pair
			: acc
		return result
	}

	const result = _(blogs)
		.groupBy('author')
		.mapValues(array => array.reduce((sum, item) => sum + ((item.likes) ? item.likes : 0)
		, 0))
		.reduce(reducer, { likes: 0 })

	return result
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
