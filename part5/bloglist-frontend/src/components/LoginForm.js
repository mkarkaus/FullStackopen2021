import React from "react"
import Notification from "./Notification"

const LoginForm = ({
	notification,
	handleLogin,
	username,
	password,
	handleUsernameChange,
	handlePasswordChange
}) => (
	<div>
		<h2>Log in to application</h2>
		<Notification 
			message={notification.message}
			type={notification.type}
		/>
		<form onSubmit={handleLogin}>
			<div>
				username <input 
					value={username}
					onChange={handleUsernameChange}
				/>
			</div>
			<div>
				password <input 
					type="password"
					value={password}
					onChange={handlePasswordChange}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	</div>
)

export default LoginForm