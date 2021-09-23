const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	
	response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (blog)
		response.json(blog)
	else
		response.status(404).end()
})

blogsRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)

	if (blog && (blog.title && blog.url))
	{
		const result = await blog.save()
		response.status(201).json(result)
	}
	else
		response.status(400).end()
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

module.exports = blogsRouter
