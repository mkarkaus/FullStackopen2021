const listHelper = require('../utils/list_helper')
const blogs = require("./blogs")

describe('Total likes', () => {
	test('of empty list is zero', () => {
		const result = listHelper.totalLikes([])
		expect(result).toBe(0)
	})
	test('of list with only empty "likes"-fields', () => {
		const result = listHelper.totalLikes(blogs.listWithoutlikes)
		expect(result).toBe(0)
	})
	test('of list with some empty "likes"-fields', () => {
		const result = listHelper.totalLikes(blogs.listWithSomeEmpty)
		expect(result).toBe(7)
	})
	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(blogs.listWithOneBlog)
		expect(result).toBe(5)
	})
	test('of a bigger list is calculated right', () => {
		const result = listHelper.totalLikes(blogs.biggerList)
		expect(result).toBe(56)
	})
})
