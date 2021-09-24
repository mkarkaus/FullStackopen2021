const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./blogs')
const { request } = require('../app')
const app = require('../app')

const api = supertest(app)

describe('Inspecting all the blogs', () => {
	test('correct amount of blogs and as json is returned', async () => {
		const response = await api.get('/api/blogs')
			.expect('Content-Type', /application\/json/)
		
		expect(response.body).toHaveLength(3)
	})
	
	test("Unique identifier property is named 'id'", async () => {
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
	
		const addedBlog = await api.post('/api/blogs').send(blog)
		const updatedResponse = await api.get('/api/blogs')
		const updatedBlogs = updatedResponse.body
		const newBlog = updatedBlogs.find(blog => blog.id === addedBlog.body.id)
	
		expect(updatedBlogs).toHaveLength(initialBlogs.length + 1)
	
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
	
	test('Missing title and url in request receive respond 400 Bad Request', async () => {
		const blog = {
			author: 'THE author',
			likes: 1122
		}
		await api.post('/api/blogs').send(blog).expect(400)
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

		const response = await api.post('/api/blogs').send(blog)
		const addedBlog = response.body
		const allBlogs = await api.get('/api/blogs')
		await api.delete(`/api/blogs/${addedBlog.id}`).expect(204)
		const afterDeletion = await api.get('/api/blogs')
		
		expect(afterDeletion.body).toHaveLength(allBlogs.body.length - 1)
	})

	test('Invalid id responds with status code 404', async () => {
		const invalidId = '5a3d5da59070081a82a3446'

		await api
			.delete(`/api/blogs/${invalidId}`)
			.expect(404)
	})

	test('Nonexisting Id returns 404', async () => {
		const nonexistingId = '5a3d5da59070081a82a34465'

		await api
			.delete(`/api/blogs/${nonexistingId}`)
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

		const response = await api.post('/api/blogs').send(origBlog)
		const blog = response.body
		await api.put(`/api/blogs/${blog.id}`).send(modifBlog)
		
		const endResponse = await api.get(`/api/blogs/${blog.id}`)
		const endBlog = endResponse.body
		delete endBlog.id
		expect(endBlog).toStrictEqual(modifBlog)

		await api.delete(`/api/blogs/${blog.id}`)
	})

	test('Invalid Id returns 404', async () => {
		const invalidId = '5a3d5da59070081a82a3446'

		await api
			.put(`/api/blogs/${invalidId}`).send({})
			.expect(404)
	})

	test('Nonexisting Id returns 404', async () => {
		const nonexistingId = '5a3d5da59070081a82a34465'

		await api
			.put(`/api/blogs/${nonexistingId}`).send({})
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

		const response = await api.post('/api/blogs').send(origBlog)
		const blog = response.body
		await api.put(`/api/blogs/${blog.id}`).send(modifBlog)
		
		const endResponse = await api.get(`/api/blogs/${blog.id}`)
		const endBlog = endResponse.body
		delete endBlog.id
		expect(endBlog).toStrictEqual(modifBlog)

		await api.delete(`/api/blogs/${blog.id}`)
	})
})

afterAll(() => {
	mongoose.connection.close()
})