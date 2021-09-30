const blogsRouter = require('express').Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

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
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!request.token || !decodedToken.id)
		return response.status(401).json({ error: 'token missing or invalid' })
	const user = await User.findById(decodedToken.id)

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
	if (mongoose.Types.ObjectId.isValid(request.params.id) && await Blog.findById(request.params.id))
	{
		const blog = await Blog.findByIdAndRemove(request.params.id)
		response.status(204).json(blog)
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
