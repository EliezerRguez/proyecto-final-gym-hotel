import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../styles/home.scss";

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<h1>LOG IN</h1>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">We ll never share your email with anyone else.</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Room number</Form.Label>
					<Form.Control type="password" placeholder="Room Number" />
				</Form.Group>
				<Link to="/personal-data">
					<Button variant="primary" type="submit">
						Log me in!
					</Button>
				</Link>
			</Form>
		</div>
	);
};
