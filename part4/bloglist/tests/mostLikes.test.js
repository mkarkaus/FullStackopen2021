const listHelper = require('../utils/list_helper')
const blogs = require('./blogs')

describe('Most likes', () => {
	test('of empty list', () => {
		const result = listHelper.mostLikes([])
		expect(result).toEqual({ likes: 0 })
	})

	test('of list with only empty "likes"-fields', () => {
		const result = listHelper.mostLikes(blogs.listWithoutlikes)
		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 0
		})
	})

	test('of list with some empty "likes"-fields', () => {
		const result = listHelper.mostLikes(blogs.listWithSomeEmpty)
		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 7
		})
	})

	test('of a list with one top blogger', () => {
		const result = listHelper.mostLikes(blogs.biggerList)
		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 35
		})
	})

	test('of list with two bloggers with same amount of likes', () => {
		const result = listHelper.mostLikes(blogs.twoTopBloggers)
		expect(result).toEqual({
			author: 'Harry Potter',
			likes: 35
		})
	})

	test('of list with four bloggers with same amount of likes', () => {
		const result = listHelper.mostLikes(blogs.fourTopBloggers)
		expect(result).toEqual({
			author: 'Henry',
			likes: 17
		})
	})

	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.mostLikes(blogs.listWithOneBlog)
		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 5
		})
	})
})
