import React, { useState, useImperativeHandle } from 'react'

const Blog = React.forwardRef((props, ref) => {
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

		props.incrementLike({
			title: props.blog.title,
			author: props.blog.author,
			url: props.blog.url,
			likes: props.blog.likes,
			id: props.blog.id,
			user: props.blog.user.id
		})
	}

	return (
		<div style={blogStyle}>
			<div>
				{props.blog.title} {props.blog.author}
				&nbsp;<button onClick={toggleVisibility}>
					{showAll ? 'hide' : 'view'}
				</button>
			</div>
			<div style={{ display: showAll ? '' : 'none'}}>
				{props.blog.url}
				<br />
				likes: {props.blog.likes} <button onClick={addLike}>like</button>
				<br />
				{props.blog.user.name !== undefined ?
					props.blog.user.name :
					props.blog.user.username
				}
			</div>  
		</div>
	)
})

export default Blog