import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [notification, setNotification] = useState({ message: null, type: null })
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const [user, setUser] = useState(null)

  	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)  
	}, [])

  	useEffect(() => {
		const loggedUser = window.localStorage.getItem('loggedBlogappUser')

		setUser(loggedUser ? JSON.parse(loggedUser) : null)
	}, [])

	const handleLogout = () => {
		setUser(null)
		setTitle('')
		setAuthor('')
		setUrl('')
		window.localStorage.removeItem('loggedBlogappUser')
		setNotification({
			message: "Logged out successfully",
			type: "notification"
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
			setNotification({
				message: `${user.username} logged in successfully`,
				type: "notification"
			})
		} catch (exception) {
			setNotification({
				message: "Wrong username or password",
				type: "error"
			})
		}
		setTimeout(() => {
			setNotification({ message: null, type: null })
		}, 2000)
	}

	const addBlog = async event => {
		event.preventDefault()

		try {
			await blogService.createNew({
				title,
				author,
				url
			}, user.token)
			const newBlogs = await blogService.getAll()

			setTitle('')
			setAuthor('')
			setUrl('')
			setBlogs(newBlogs)
			setNotification({
				message: `'${title}' by author '${author}' added successfully`,
				type: "notification"
			})
		} catch (exception) {
			setNotification({
				message: "Invalid blog",
				type: "error"
			})
		}
		setTimeout(() => {
			setNotification({ message: null, type: null })
		}, 2000)
	}

	const loginForm = () => (
		<div>
			<h2>Log in to application</h2>
			<Notification 
						message={notification.message}
						type={notification.type}
			/>
			<form onSubmit={handleLogin}>
				<div>
					username <input 
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password <input 
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)

	const blogForm = () => (
		<div>
			<h2>Create a new blog</h2>
			<form onSubmit={addBlog}>
				<div>
					title: <input
						type="text"
						value={title}
						name="Title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author: <input
						type="text"
						value={author}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url: <input
						type="text"
						value={url}
						name="Url"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type= "submit">create</button>
			</form>
		</div>
	)

	const showBlogs = () => (
		<div>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
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