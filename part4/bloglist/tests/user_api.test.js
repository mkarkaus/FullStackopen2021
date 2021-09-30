const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('Adding a user', () => {
	test('Returns code 400 and doesn\'t add user if username is too short', async () => {
		const response = await api.get('/api/users')
		const users = response.body

		const user = {
			username: 'jk',
			password: 'thisshoulddo'
		}
		await api
			.post('/api/users')
			.send(user)
			.expect(400)

		const responseAtEnd = await api.get('/api/users')
		const usersAtEnd = responseAtEnd.body.map((v) => v.username)

		expect(users).toHaveLength(usersAtEnd.length)
		expect(usersAtEnd).not.toContainEqual('jk')
	})

	test('Trying to add an already existing username returns 400 and doesn\'t add user', async () => {
		const response = await api.get('/api/users')
		const users = response.body

		const user = {
			username: 'mluukkai',
			password: 'thisshoulddo'
		}
		await api
			.post('/api/users')
			.send(user)
			.expect(400)
			.expect('{"error":"username is already in use"}')

		const responseAtEnd = await api.get('/api/users')
		const usersAtEnd = responseAtEnd.body

		expect(users).toHaveLength(usersAtEnd.length)
	})

	test('Trying to add user without password returns 400 and doesn\'t add user', async () => {
		const response = await api.get('/api/users')
		const users = response.body

		const user = { username: 'emusk' }
		await api
			.post('/api/users')
			.send(user)
			.expect(400)
			.expect('{"error":"password has to be provided"}')

		const responseAtEnd = await api.get('/api/users')
		const usersAtEnd = responseAtEnd.body.map((v) => v.username)

		expect(users).toHaveLength(usersAtEnd.length)
		expect(usersAtEnd).not.toContainEqual('emusk')
	})

	test('Returns code 400 and doesn\'t add user if password is too short', async () => {
		const response = await api.get('/api/users')
		const users = response.body

		const user = {
			username: 'emusk',
			password: 'jk'
		}
		await api
			.post('/api/users')
			.send(user)
			.expect(400)
			.expect('{"error":"password must be at least 3 characters long"}')

		const responseAtEnd = await api.get('/api/users')
		const usersAtEnd = responseAtEnd.body.map((v) => v.username)

		expect(users).toHaveLength(usersAtEnd.length)
		expect(usersAtEnd).not.toContainEqual('emusk')
	})
})

afterAll(() => {
	mongoose.connection.close()
})