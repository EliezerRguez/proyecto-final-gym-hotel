import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../styles/home.scss";

export const Plans = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>PLAN</h1>
			<Card className="mx-4">
				<Card.Img variant="top" src="holder.js/100px180" />
				PLAN SEGUN ESTANCIA
				<Card.Body>
					<Card.Text>
						<div>Lorem ipsum</div>
						<Link to="/booking">BOOKING</Link>
					</Card.Text>
				</Card.Body>
			</Card>
			<br />

			<Card className="mx-4">
				<Card.Img variant="top" src="holder.js/100px180" />
				CUSTOMIZE
				<Card.Body>
					<Card.Text>
						<div>Lorem ipsum</div>
						<Link to="/customize">CUSTOMIZE</Link>
					</Card.Text>
				</Card.Body>
			</Card>
			<br />
		</div>
	);
};
