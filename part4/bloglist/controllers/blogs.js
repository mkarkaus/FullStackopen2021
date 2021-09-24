const blogsRouter = require('express').Router()
const mongoose = require('mongoose')
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
	if (mongoose.Types.ObjectId.isValid(request.params.id) && await Blog.findById(request.params.id))
	{
		const blog = await Blog.findByIdAndRemove(request.params.id)
		response.status(204).json(blog)
	}
	else
		response.status(404).end()
})

module.exports = blogsRouter
