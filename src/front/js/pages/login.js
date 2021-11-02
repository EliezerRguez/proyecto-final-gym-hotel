import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../styles/home.scss";
import { useHistory } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState(null);
	const [room, setRoom] = useState(null);
	let history = useHistory();

	async function login(event) {
		event.preventDefault();

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

		if (!response.ok) {
			alert("Invalid credentials");
			return;
		}

		const data = await response.json();
		// save your token in the localStorage
		//also you should set your user into the store using the setStore function
		localStorage.setItem("jwt-token", data.token);
		actions.setClientToken(data.token);

		if (data.client_gender !== null) {
			history.push("/homepage");
		} else {
			history.push("/personal-data");
		}
	}

	return (
		<div className="container h-100 login p-0">
			<div className="login-area text-dark h-100 p-4 text-center">
				<Row>
					<Col xs={12} sm={6}>
						<Image src={require(`../../img/imagen-gym-inicio.png`)} width="90%" />
					</Col>
					<Col xs={12} sm={6}>
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
								<span>LOG ME IN!</span>
							</Button>
						</Form>
					</Col>
				</Row>
			</div>
		</div>
	);
};
