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

		if (data.client_gender != null) {
			history.push("/homepage");
		} else {
			history.push("/personal-data");
		}
	}

	return (
		<div className="container h-100 login p-0">
			<div className="login-area text-light h-100 p-4 text-center">
				<h1>WELCOME TO APPTIVATE</h1>
				<Form onSubmit={login}>
					<Form.Group className="my-4" controlId="formBasicEmail">
						<Form.Control
							type="email"
							placeholder="Enter email"
							onChange={event => setEmail(event.target.value)}
							required
						/>
					</Form.Group>

					<Form.Group className="mb-4" controlId="formBasicPassword">
						<Form.Control
							type="password"
							placeholder="Room Number"
							onChange={event => setRoom(event.target.value)}
							required
						/>
					</Form.Group>
					<Button className="w-100 button-login" type="submit" size="lg">
						<span className="text-dark fw-bold">LOG ME IN!</span>
					</Button>
				</Form>
			</div>
		</div>
	);
};
