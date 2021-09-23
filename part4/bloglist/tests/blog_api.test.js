const mongoose = require('mongoose')
const supertest = require('supertest')
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

afterAll(() => {
	mongoose.connection.close()
})