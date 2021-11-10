import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../styles/home.scss";

export const PlanConfirmation = () => {
	const [myplan, setMyplan] = useState([]);
	const { store, actions } = useContext(Context);
	const token = localStorage.getItem("jwt-token");

	async function getConfirmPlan() {
		const response = await fetch(process.env.BACKEND_URL + "/api/plan-selected", {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			}
		});
		console.log(response);
		const responseJson = await response.json();
		setMyplan(responseJson);
		console.log(responseJson);
	}
	useEffect(() => {
		getConfirmPlan();
		actions.setShowNavbar(true);
	}, []);

	return (
		<div className="p-4 escritorio">
			<h5 className="titulo-plan-confirmation"> Has seleccionado: </h5>
			<Card className="plan-hotel-confirmation">
				<Card.Img src={require(`../../img/imagen-customize.jpg`)} />
				<Card.Body>
					<Card.Text>
						<span className="exercise-title-confirmation text-light fw-bold">{myplan.name}</span>
						<Link to="/booking">
							<Button className="w-100 boton-ejercicio-confirmar">Reserva tu entrenamiento</Button>
						</Link>
					</Card.Text>
				</Card.Body>
			</Card>
			<Link to="/plans">
				<Button className="boton-volver">Volver</Button>
			</Link>
		</div>
	);
};
