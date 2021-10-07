import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../styles/home.scss";

export const Info = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>INFORMATION</h1>
			<Card className="mx-4">
				<Card.Img variant="top" src="holder.js/100px180" />
				IMAGEN GYM
				<Card.Body>
					<Card.Text>
						<div>Lorem ipsum</div>
					</Card.Text>
				</Card.Body>
			</Card>
			<br />

			<Card className="mx-4">
				<Card.Img variant="top" src="holder.js/100px180" />
				PROTOCOLO
				<Card.Body>
					<Card.Text>
						<div>Lorem ipsum</div>
					</Card.Text>
				</Card.Body>
			</Card>
			<br />

			<Card className="mx-4">
				<Card.Img variant="top" src="holder.js/100px180" />
				CONTACTO
				<Card.Body>
					<Card.Text>
						<Link to="/plans">
							<Button variant="primary" type="submit">
								LLAMA YA
							</Button>
						</Link>
					</Card.Text>
				</Card.Body>
			</Card>
			<br />
		</div>
	);
};
