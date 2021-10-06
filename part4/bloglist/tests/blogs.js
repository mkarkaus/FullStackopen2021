const User = require('../models/user')

const biggerList = [
	{
		_id: '5a422aa71b54a676234d17f1',
		title: 'Go To Statement Considered Fun',
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
		title: 'Go To Statement Considered Strange',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 17,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f4',
		title: 'Spells and stuff',
		author: 'Harry Potter',
		url: 'http://www.youtube.com',
		likes: 12,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f5',
		title: 'Magical beasts',
		author: 'Harry Potter',
		url: 'http://www.youtube.com',
		likes: 4,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f6',
		title: 'Go To Statement Considered Happy',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 7,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f6',
		title: 'Testtest',
		author: 'Henry',
		url: 'http://www.google.fi',
		likes: 5,
		__v: 0
	}
]

const twoTopBloggers = [
	{
		_id: '5a422aa71b54a676234d17f1',
		title: 'Go To Statement Considered Fun',
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
		title: 'Go To Statement Considered Strange',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 17,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f4',
		title: 'Spells and stuff',
		author: 'Harry Potter',
		url: 'http://www.youtube.com',
		likes: 15,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f5',
		title: 'Magical beasts',
		author: 'Harry Potter',
		url: 'http://www.youtube.com',
		likes: 4,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17e4',
		title: 'Flying Brooms',
		author: 'Harry Potter',
		url: 'http://www.youtube.com',
		likes: 12,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f5',
		title: 'Cockroaches',
		author: 'Harry Potter',
		url: 'http://www.youtube.com',
		likes: 4,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f6',
		title: 'Go To Statement Considered Happy',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 7,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f6',
		title: 'Testtest',
		author: 'Henry',
		url: 'http://www.google.fi',
		likes: 5,
		__v: 0
	}
]

const fourTopBloggers = [
	{
		_id: '5a422aa71b54a676234d17a2',
		title: 'Happy little trees',
		author: 'Bob Ross',
		url: 'http://www.paint.com',
		likes: 8,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17a3',
		title: 'Happy little accidents',
		author: 'Bob Ross',
		url: 'http://www.paint.com',
		likes: 9,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f1',
		title: 'Go To Statement Considered Fun',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 7,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f2',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 10,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17e4',
		title: 'Flying Brooms',
		author: 'Harry Potter',
		url: 'http://www.youtube.com',
		likes: 12,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f5',
		title: 'Cockroaches',
		author: 'Harry Potter',
		url: 'http://www.youtube.com',
		likes: 5,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f6',
		title: 'Testtest',
		author: 'Henry',
		url: 'http://www.google.fi',
		likes: 3,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17e1',
		title: 'Test123',
		author: 'Henry',
		url: 'http://www.google.fi',
		likes: 14,
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

const initialBlogs = [
	{
		title: 'Test',
		author: 'Bill Musk',
		url: 'https://www.google.com/',
		likes: 10
	},
	{
		title: 'Some recipe',
		author: 'Gordon Ramsay',
		url: 'https://www.youtube.com/',
		likes: 321
	},
	{
		title: 'New one',
		author: 'How to grow a plant',
		url: 'https://en.wikipedia.org/wiki/Plant',
		likes: 3423
	}
]

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
}

module.exports = {
	initialBlogs,
	biggerList,
	listWithOneBlog,
	listWithoutlikes,
	listWithSomeEmpty,
	twoTopBloggers,
	fourTopBloggers,
	usersInDb
}
