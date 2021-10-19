import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [notification, setNotification] = useState({ message: null, type: null })
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const blogFormRef = useRef()
	const blogRef = useRef()

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)
	}, [])

	useEffect(() => {
		const loggedUser = window.localStorage.getItem('loggedBlogappUser')

		if (loggedUser)
		{
			const user = JSON.parse(loggedUser)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogout = () => {
		setUser(null)
		window.localStorage.removeItem('loggedBlogappUser')
		blogService.setToken(null)
		setNotification({
			message: 'Logged out successfully',
			type: 'notification'
		})
		setTimeout(() => {
			setNotification({ message: null, type: null })
		}, 2000)
	}

	const handleLogin = async event => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username, password
			})

			window.localStorage.setItem(
				'loggedBlogappUser',
				JSON.stringify(user)
			)
			setUser(user)
			setUsername('')
			setPassword('')
			blogService.setToken(user.token)
			setNotification({
				message: `${user.username} logged in successfully`,
				type: 'notification'
			})
		} catch (exception) {
			setNotification({
				message: 'Wrong username or password',
				type: 'error'
			})
		}
		setTimeout(() => {
			setNotification({ message: null, type: null })
		}, 2000)
	}

	const addBlog = async blogObject => {
		blogFormRef.current.toggleVisibility()

		try {
			await blogService.createNew(blogObject, user.token)
			const newBlogs = await blogService.getAll()

			setBlogs(newBlogs)
			setNotification({
				message: `'${blogObject.title}' by author '${blogObject.author}' added successfully`,
				type: 'notification'
			})
		} catch (exception) {
			setNotification({
				message: 'Invalid blog',
				type: 'error'
			})
		}
		setTimeout(() => {
			setNotification({ message: null, type: null })
		}, 2000)
	}

	const addLike = async (blogObject) => {
		await blogService.modify({
			user: blogObject.user,
			likes: blogObject.likes + 1,
			author: blogObject.author,
			title: blogObject.title,
			url: blogObject.url,
			id: blogObject.id
		})
		const newBlogs = await blogService.getAll()
		setBlogs(newBlogs)
	}

	const matchingUser = (blog) => user.username === blog.user.username

	const removeBlog = async (blog) => {
		if (user.username === blog.user.username)
		{
			await blogService.deleteOne(blog)

			setNotification({
				message: `'${blog.title}' succesfully removed`,
				type: 'notification'
			})
			const newBlogs = await blogService.getAll()
			setBlogs(newBlogs)
		}
		else
			setNotification({
				message: 'Unauthorized to remove that blog',
				type: 'error'
			})
		setTimeout(() => {
			setNotification({ message: null, type: null })
		}, 2000)
	}

	const loginForm = () => (
		<LoginForm
			notification={notification}
			handleLogin={handleLogin}
			username={username}
			password={password}
			handleUsernameChange={({ target }) => setUsername(target.value)}
			handlePasswordChange={({ target }) => setPassword(target.value)}
		/>
	)

	const blogForm = () => (
		<Togglable buttonLabel='create new blog' ref={blogFormRef}>
			<BlogForm createBlog={addBlog} />
		</Togglable>
	)

	const showBlogs = () => (
		<div>
			{blogs.sort((first, next) => next.likes - first.likes)
				.map(blog =>
					<Blog key={blog.id}
						blog={blog}
						ref={blogRef}
						incrementLike={addLike}
						removeBlog={removeBlog}
						validateUser={matchingUser}
					/>
				)}
		</div>
	)

	return (
		<div>
			{
				user === null ?
					loginForm() :
					<div>
						<h2>blogs</h2>
						<Notification
							message={notification.message}
							type={notification.type}
						/>
						<p>
							{user.name} logged in&nbsp;
							<button type="button" onClick={handleLogout}>logout</button>
						</p>
						{blogForm()}
						<br/>
						{showBlogs()}
					</div>
			}
		</div>
	)
}

export default App