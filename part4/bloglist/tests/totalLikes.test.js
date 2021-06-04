const listHelper = require('../utils/list_helper')

describe('total likes', () => {
	const biggerList = [
	  {
		_id: '5a422aa71b54a676234d17f1',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 8,
		__v: 0
	  },
	  {
		_id: '5a422aa71b54a676234d17f2',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 3,
		__v: 0
	  },
	  {
		_id: '5a422aa71b54a676234d17f3',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 17,
		__v: 0
	  },
	  {
		_id: '5a422aa71b54a676234d17f4',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 12,
		__v: 0
	  },
	  {
		_id: '5a422aa71b54a676234d17f5',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 4,
		__v: 0
	  },
	  {
		_id: '5a422aa71b54a676234d17f6',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 7,
		__v: 0
	  }
	]

	const listWithOneBlog = [
	  {
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	  }
	]

	const listWithoutlikes = [
	  {
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		__v: 0
	  },
	  {
		_id: '5a422aa71b54a676234d17f7',
		title: 'Nbr. 2',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		__v: 0
	  },
	  {
		_id: '5a422aa71b54a676234d17f6',
		title: 'Nbr. 3',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		__v: 0
	  }
	]

	const listWithSomeEmpty = [
	  {
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		__v: 0
	  },
	  {
		_id: '5a422aa71b54a676234d17f7',
		title: 'Nbr. 2',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 7,
		__v: 0
	  },
	  {
		_id: '5a422aa71b54a676234d17f6',
		title: 'Nbr. 3',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		__v: 0
	  }
	]

	test('of empty list is zero', () => {
		const result = listHelper.totalLikes([])
		expect(result).toBe(0)
	})
	test('of list with only empty "likes"-fields', () => {
		const result = listHelper.totalLikes(listWithoutlikes)
		expect(result).toBe(0)
	})
	test('of list with some empty "likes"-fields', () => {
		const result = listHelper.totalLikes(listWithSomeEmpty)
		expect(result).toBe(7)
	})
	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(listWithOneBlog)
		expect(result).toBe(5)
	})
	test('of a bigger list is calculated right', () => {
		const result = listHelper.totalLikes(biggerList)
		expect(result).toBe(51)
	})
})
