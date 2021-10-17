import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../styles/home.scss";
import { useHistory } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState(null);
	const [room, setRoom] = useState(null);
	let history = useHistory();

	async function login(event) {
		event.preventDefault();
		console.log("hola11");
		const response = await fetch(process.env.BACKEND_URL + "/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				room: room
			})
		});
		console.log(response);
		if (!response.ok) throw Error("There was a problem in the login request");

		if (response.status === 401) {
			throw "Invalid credentials";
		} else if (response.status === 400) {
			throw "Invalid email or password format";
		}
		const data = await response.json();
		// save your token in the localStorage
		//also you should set your user into the store using the setStore function
		localStorage.setItem("jwt-token", data.token);
		actions.setClientToken(data.token);

		history.push("/personal-data");
	}

	return (
		<div className="container">
			<h1>LOG IN</h1>
			<Form onSubmit={login}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						onChange={event => setEmail(event.target.value)}
						required
					/>
					<Form.Text className="text-muted">We ll never share your email with anyone else.</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Room number</Form.Label>
					<Form.Control
						type="password"
						placeholder="Room Number"
						onChange={event => setRoom(event.target.value)}
						required
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Log me in!
				</Button>
			</Form>
		</div>
	);
};
