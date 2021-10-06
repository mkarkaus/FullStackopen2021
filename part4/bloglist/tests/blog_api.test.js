const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./blogs')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

beforeAll(async () => {
	const user = {
		username: 'mkarkaus',
		password: 'miikka'
	}

	const response = await api
		.post('/api/login')
		.send(user)

	const token = response.body.token
	return process.env.token = token
})

afterAll(() => {
	return delete process.env.token
})

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
})


describe('Inspecting all the blogs', () => {
	test('correct amount of blogs and as json is returned', async () => {
		const response = await api.get('/api/blogs')
			.expect('Content-Type', /application\/json/)

		expect(response.body).toHaveLength(3)
	})

	test('Unique identifier property is named id', async () => {
		const response = await api.get('/api/blogs')

		response.body.map(blog => {
			expect(blog.id).toBeDefined()
		})
	})
})


describe('Adding a new blog', () => {

	test('POST request successfully creates a new blog post', async () => {
		const response = await api.get('/api/blogs')
		const initialBlogs = response.body
		const blog = {
			title: 'THE Book',
			author: 'THE author',
			url: 'https://www.theurl.org',
			likes: 1122
		}

		const addedBlog = await api.post('/api/blogs')
			.send(blog)
			.set('Authorization', 'bearer ' + process.env.token)

		const updatedResponse = await api.get('/api/blogs')
		const updatedBlogs = updatedResponse.body
		const newBlog = updatedBlogs.find(blog => blog.id === addedBlog.body.id)

		expect(updatedBlogs).toHaveLength(initialBlogs.length + 1)

		expect(newBlog.title).toBe(blog.title)
		expect(newBlog.author).toBe(blog.author)
		expect(newBlog.url).toBe(blog.url)
		expect(newBlog.likes).toBe(blog.likes)
	})

	test('Likes property value will default to 0 if it\'s missing from the request', async () => {
		const blog = {
			title: 'THE Book',
			author: 'THE author',
			url: 'https://www.theurl.org'
		}

		const response = await api.post('/api/blogs')
			.send(blog)
			.set('Authorization', 'bearer ' + process.env.token)
		const addedBlog = await api.get(`/api/blogs/${response.body.id}`)

		expect(addedBlog.body.likes).toBe(0)
	})

	test('Missing title and url in request receive respond 400 Bad Request', async () => {
		const blog = {
			author: 'THE author',
			likes: 1122
		}
		await api.post('/api/blogs')
			.send(blog)
			.set('Authorization', 'bearer ' + process.env.token)
			.expect(400)
	})

	test('Adding a blog results in status code 401 without token', async () => {
		const blog = {
			title: 'THE Book',
			author: 'THE author',
			url: 'https://www.theurl.org',
			likes: 300
		}

		await api.post('/api/blogs')
			.send(blog)
			.expect(401)
	})
})

describe('Deletion of a blog', () => {
	test('Deletion works with a valid id', async () => {
		const blog = {
			title: 'THE Book',
			author: 'THE author',
			url: 'https://www.theurl.org',
			likes: 1122
		}

		const response = await api
			.post('/api/blogs')
			.send(blog)
			.set('Authorization', 'bearer ' + process.env.token)
		const addedBlog = response.body
		const allBlogs = await api.get('/api/blogs')
		await api
			.delete(`/api/blogs/${addedBlog.id}`)
			.set('Authorization', 'bearer ' + process.env.token)
			.expect(204)
		const afterDeletion = await api.get('/api/blogs')

		expect(afterDeletion.body).toHaveLength(allBlogs.body.length - 1)
	})

	test('Invalid id responds with status code 404', async () => {
		const invalidId = '5a3d5da59070081a82a3446'

		await api
			.delete(`/api/blogs/${invalidId}`)
			.set('Authorization', 'bearer ' + process.env.token)
			.expect(404)
	})

	test('Nonexisting Id returns 404', async () => {
		const nonexistingId = '5a3d5da59070081a82a34465'

		await api
			.delete(`/api/blogs/${nonexistingId}`)
			.set('Authorization', 'bearer ' + process.env.token)
			.expect(404)
	})
})

describe('Modifying existing blog', () => {
	test('Valid Id and data', async () => {
		const origBlog = {
			title: 'THE Book',
			author: 'THE author',
			url: 'https://www.theurl.org',
			likes: 1122
		}
		const modifBlog = {
			title: 'THE NEW Book',
			author: 'THE NEW author',
			url: 'https://www.thenewurl.org',
			likes: 33
		}

		const response = await api.post('/api/blogs')
			.send(origBlog)
			.set('Authorization', 'bearer ' + process.env.token)
		const blog = response.body
		await api.put(`/api/blogs/${blog.id}`)
			.send(modifBlog)
			.set('Authorization', 'bearer ' + process.env.token)
		const endResponse = await api.get(`/api/blogs/${blog.id}`)
		const endBlog = endResponse.body
		delete endBlog.id
		delete endBlog.user
		expect(endBlog).toStrictEqual(modifBlog)
	})

	test('Invalid Id returns 404', async () => {
		const invalidId = '5a3d5da59070081a82a3446'

		await api
			.put(`/api/blogs/${invalidId}`)
			.send({})
			.set('Authorization', 'bearer ' + process.env.token)
			.expect(404)
	})

	test('Nonexisting Id returns 404', async () => {
		const nonexistingId = '5a3d5da59070081a82a34465'

		await api
			.put(`/api/blogs/${nonexistingId}`)
			.send({})
			.set('Authorization', 'bearer ' + process.env.token)
			.expect(404)
	})

	test('Update only likes', async () => {
		const origBlog = {
			title: 'THE Book',
			author: 'THE author',
			url: 'https://www.theurl.org',
			likes: 1122
		}
		const modifBlog = {
			title: 'THE Book',
			author: 'THE author',
			url: 'https://www.theurl.org',
			likes: 33
		}

		const response = await api.post('/api/blogs')
			.send(origBlog)
			.set('Authorization', 'bearer ' + process.env.token)
		const blog = response.body
		await api.put(`/api/blogs/${blog.id}`)
			.send(modifBlog)
			.set('Authorization', 'bearer ' + process.env.token)
		const endResponse = await api.get(`/api/blogs/${blog.id}`)
		const endBlog = endResponse.body
		delete endBlog.id
		delete endBlog.user
		expect(endBlog).toStrictEqual(modifBlog)
	})
})

describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('miikka', 10)
		const user = new User({ username: 'mkarkaus', passwordHash })

		await user.save()
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'mkarkaus',
			name: 'Impostor',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('username is already in use')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
})