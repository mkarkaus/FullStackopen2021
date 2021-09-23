const mongoose = require('mongoose')
const supertest = require('supertest')
const { request } = require('../app')
const app = require('../app')

const api = supertest(app)

test('correct amount of blogs and as json is returned', async () => {
	const response = await api.get('/api/blogs')
		.expect('Content-Type', /application\/json/)
	
	expect(response.body.length).toBe(3)
})

test("Unique identifier property is named 'id'", async () => {
	const response = await api.get('/api/blogs')

	response.body.map(blog => {
		expect(blog.id).toBeDefined()
	})
})

test('POST request successfully creates a new blog post', async () => {
	const response = await api.get('/api/blogs')
	const initialBlogs = response.body
	const blog = {
		title: 'THE Book',
		author: 'THE author',
		url: 'https://www.theurl.org',
		likes: 1122
	}

	const addedBlog = await api.post('/api/blogs').send(blog)
	const updatedResponse = await api.get('/api/blogs')
	const updatedBlogs = updatedResponse.body
	const newBlog = updatedBlogs.find(blog => blog.id === addedBlog.body.id)

	expect(updatedBlogs.length).toBe(initialBlogs.length + 1)

	expect(newBlog.title).toBe(blog.title)
	expect(newBlog.author).toBe(blog.author)
	expect(newBlog.url).toBe(blog.url)
	expect(newBlog.likes).toBe(blog.likes)

	await api.delete(`/api/blogs/${addedBlog.body.id}`)
})

test("'Likes' property value will default to 0 if it's missing from the request", async () => {
	const blog = {
		title: 'THE Book',
		author: 'THE author',
		url: 'https://www.theurl.org'
	}

	const response = await api.post('/api/blogs').send(blog)
	const addedBlog = await api.get(`/api/blogs/${response.body.id}`)

	expect(addedBlog.body.likes).toBe(0)

	await api.delete(`/api/blogs/${addedBlog.body.id}`)
})

afterAll(() => {
	mongoose.connection.close()
})