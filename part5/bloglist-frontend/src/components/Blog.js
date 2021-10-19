import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Blog = React.forwardRef(({
	blog,
	incrementLike,
	removeBlog,
	validateUser
}, ref) => {
	const [showAll, setShowAll] = useState(false)

	const blogStyle = {
		color: 'blue',
		background: 'lightgrey',
		paddingTop: 4,
		paddingBottom: 4,
		paddingLeft: 6,
		border: 'solid',
		borderWidth: 2,
		marginBottom: 5
	}

	const toggleVisibility = () => {
		setShowAll(!showAll)
	}

	useImperativeHandle(ref, () => {
		return { toggleVisibility }
	})

	const addLike = (event) => {
		event.preventDefault()

		incrementLike({
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes,
			id: blog.id,
			user: blog.user.id
		})
	}

	const deleteBlog = (event) => {
		event.preventDefault()
		if (window.confirm(`Remove blog '${blog.title}' by author '${blog.author}'?`))
			removeBlog(blog)
	}

	return (
		<div style={blogStyle}>
			<div>
				{blog.title} {blog.author}
				&nbsp;<button onClick={toggleVisibility}>
					{showAll ? 'hide' : 'view'}
				</button>
			</div>
			<div style={{ display: showAll ? '' : 'none' }}>
				{blog.url}
				<br />
				likes: {blog.likes} <button onClick={addLike}>like</button>
				<br />
				{
					blog.user.name !== undefined ?
						blog.user.name :
						blog.user.username
				}
				<br />
				{
					validateUser(blog) ?
						<button style={{ color: 'red' }} onClick={deleteBlog}>remove</button> :
						null
				}
			</div>
		</div>
	)
})

Blog.displayName = 'Blog'

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	incrementLike: PropTypes.func.isRequired,
	removeBlog: PropTypes.func.isRequired,
	validateUser: PropTypes.func.isRequired
}

export default Blog