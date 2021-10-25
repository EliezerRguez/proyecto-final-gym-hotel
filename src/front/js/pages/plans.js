import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../styles/home.scss";

export const Plans = () => {
	const [plans, setPlans] = useState([]);
	const { store, actions } = useContext(Context);
	const token = localStorage.getItem("jwt-token");

	async function getPlan() {
		const response = await fetch(process.env.BACKEND_URL + "/api/select-a-plan", {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			}
		});
		console.log(response);
		const responseJson = await response.json();
		setPlans(responseJson);
		console.log(responseJson);
	}
	useEffect(() => {
		getPlan();
	}, []);
	return (
		<div className="container">
			<h1>PLAN</h1>

			<div className="row flex-nowrap ">
				<Card className="m-4">
					<h5>{plans.id}</h5>
					<h5>{plans.name}</h5>
					<h5> Tiempo total de ejecución: {plans.time}</h5>
					<h5> Nivel de dificultad: {plans.difficulty}</h5>
					<Link to="/booking">BOOKING</Link>
				</Card>
			</div>
			<> </>
			<div className="row flex-nowrap ">
				<Card className="m-4">
					<Card.Img variant="top" src="holder.js/100px180" />
					Imagen de perfil persona
					<Card.Body>
						<Card.Text>
							<Link to="/customize">
								<Button className="mt-5" size="lg">
									PLAN CUSTOMIZE
								</Button>
							</Link>
						</Card.Text>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
};
