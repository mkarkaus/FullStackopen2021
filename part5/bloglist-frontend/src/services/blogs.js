import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const createNew = async (blog, token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` }
	}
	const response = await axios.post(baseUrl, blog, config)

	return response.data
}

const modify = async (blog) => {
	const response = await axios.put(`${baseUrl}/${blog.id}`, blog)

	return response.data
}

export default { getAll, createNew, modify }