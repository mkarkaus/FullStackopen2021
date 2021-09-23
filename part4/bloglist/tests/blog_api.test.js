const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('correct amount of blogs and as json is returned', async () => {
	const response = await api.get('/api/blogs')
		.expect('Content-Type', /application\/json/)
	
	expect(response.body.length).toBe(3)
})

afterAll(() => {
	mongoose.connection.close()
})