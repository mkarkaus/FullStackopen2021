const listHelper = require("../utils/list_helper")
const blogs = require("./blogs")

describe('Favorite blog', () => {
	test('of empty list is empty', () => {
		const result = listHelper.favoriteBlog([])
		expect(result).toEqual({})
	})
	test('of list with only empty "likes"-fields', () => {
		const result = listHelper.favoriteBlog(blogs.listWithoutlikes)
		expect(result).toEqual({})
	})
	test('of list with some empty "likes"-fields', () => {
		const result = listHelper.favoriteBlog(blogs.listWithSomeEmpty)
		expect(result).toEqual({
			title: blogs.listWithSomeEmpty[1].title,
			author: blogs.listWithSomeEmpty[1].author,
			likes: blogs.listWithSomeEmpty[1].likes
		})
	})
	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.favoriteBlog(blogs.listWithOneBlog)
		expect(result).toEqual({
			title: blogs.listWithOneBlog[0].title,
			author: blogs.listWithOneBlog[0].author,
			likes: blogs.listWithOneBlog[0].likes
		})
	})
	test('of a bigger list is calculated right', () => {
		const result = listHelper.favoriteBlog(blogs.biggerList)
		expect(result).toEqual({
			title: blogs.biggerList[2].title,
			author: blogs.biggerList[2].author,
			likes: blogs.biggerList[2].likes
		})
	})
})
