const listHelper = require("../utils/list_helper")
const blogs = require("./blogs")

describe('Most blogs', () => {
	test('of empty list', () => {
		const result = listHelper.mostBlogs([])
		expect(result).toEqual({ blogs: 0 })
	})

	test('of a list with one top blogger', () => {
		const result = listHelper.mostBlogs(blogs.biggerList)
		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			blogs: 4
		})
	})

	test('of list with two top bloggers', () => {
		const result = listHelper.mostBlogs(blogs.twoTopBloggers)
		expect(result).toEqual({
			author: 'Harry Potter',
			blogs: 4
		})
	})

	test('of list with four top bloggers', () => {
		const result = listHelper.mostBlogs(blogs.fourTopBloggers)
		expect(result).toEqual({
			author: 'Henry',
			blogs: 2
		})
	})

	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.mostBlogs(blogs.listWithOneBlog)
		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			blogs: 1
		})
	})
})
