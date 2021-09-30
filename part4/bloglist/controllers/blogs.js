const blogsRouter = require('express').Router()
const mongoose = require('mongoose')

const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({})
		.populate('user', { username: 1, name: 1 })

	response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
	if (mongoose.Types.ObjectId.isValid(request.params.id) && await Blog.findById(request.params.id))
	{
		const blog = await Blog.findById(request.params.id)
		if (blog)
			response.json(blog)
		else
			response.status(404).end()
	}
	else
		response.status(404).end()
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body
	const user = request.user
	if (!request.token)
		return response.status(401).json({ error: 'token missing or invalid' })

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id
	})

	if (blog && (blog.title && blog.url))
	{
		const savedBlog = await blog.save()
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()
		response.status(201).json(savedBlog)
	}
	else
		response.status(400).end()
})

blogsRouter.delete('/:id', async (request, response) => {
	const user = request.user
	if (!request.token)
		return response.status(401).json({ error: 'token missing or invalid' })
	const blogId = request.params.id
	const blog = (mongoose.Types.ObjectId.isValid(blogId))
		? await Blog.findById(blogId)
		: null
	if (blog && user)
	{
		if (blog.user.toString() === user.id.toString())
		{
			await Blog.findByIdAndRemove(blogId)
			response.status(204).end()
		}
		else
			response.status(401).json({ error: 'you don\'t have the permissions' })
	}
	else
		response.status(404).end()
})

blogsRouter.put('/:id', async (request, response) => {
	if (mongoose.Types.ObjectId.isValid(request.params.id) && await Blog.findById(request.params.id))
	{
		const blog = await Blog.findByIdAndUpdate(request.params.id, request.body)
		response.status(204).json(blog)
	}
	else
		response.status(404).end()
})

module.exports = blogsRouter
