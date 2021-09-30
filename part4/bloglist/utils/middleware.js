const logger = require('./logger')

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	if (error.name === 'CastError' && error.kind === 'ObjectId')
		return response.status(400).send({
			error: 'malformatted id'
		})
	else if (error.name === 'ValidationError')
	{
		if (error.message.includes('expected `username` to be unique.'))
			return response.status(400).json({
				error: 'username is already in use'
			})
		return response.status(400).json({
			error: error.message
		})
	}
	else if (error.name === 'JsonWebTokenError')
		return response.status(401).json({
			error: 'invalid token'
		})
	else if (error.name === 'TokenExpiredError')
		return response.status(401).json({
			error: 'token expired'
		})

	next(error)
}

const tokenExtractor = async (request, response, next) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer '))
		request.token = authorization.substring(7)

	next()
}

module.exports = {
	unknownEndpoint,
	errorHandler,
	tokenExtractor
}
