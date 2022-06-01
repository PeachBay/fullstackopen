import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState("");

	/* 	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []); */

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			console.log("tttttttt");
			const user = await loginService.login({
				username,
				password,
			});
			setUser(user);
			setUsername("");
			setPassword("");
			setMessage(`${username} is logged in`);
		} catch (exception) {
			setMessage("Wrong credentials");
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
	};

	const handleUserNameChange = (event) => {
		setUsername(event.target.value);
	};

	return (
		<div>
			<div>{message}</div>

			<h1>login</h1>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type="text"
						value={username}
						name="Username"
						onChange={handleUserNameChange}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>

			<h2>blogs</h2>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default App;
