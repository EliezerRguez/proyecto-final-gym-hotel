import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../styles/chooseplan.scss";

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
		actions.setShowNavbar(true);
	}, []);

	return (
		<div className="container p-3 escritorio">
			<h1>Escoge tu plan </h1>
			<div className="carouselCards-plan">
				<Card className="plan-hotel">
					<Card.Img src={require(`../../img/imagen-customize.jpg`)} />
					<Card.Body>
						<Card.Text>
							<span className="exercise-title text-light fw-bold">{plans.name}</span>
							<span className="exercise-text">
								<span className="mb-3">
									<span className="fw-bold"> Tiempo total de ejecución:</span>
									<br></br> {plans.time} minutos
								</span>
								<br></br>
								<span>
									<span className="fw-bold">Nivel de dificultad:</span> {plans.difficulty}
								</span>
							</span>
							<Link to="/PlanConfirmation">
								<Button className="w-100 boton-ejercicio" size="lg">
									Elige este plan
								</Button>
							</Link>
						</Card.Text>
					</Card.Body>
				</Card>
				<Card className="plan-hotel">
					<Card.Img src={require(`../../img/imagen-customize.jpg`)} />
					<Card.Body>
						<Card.Text>
							<span className="exercise-title text-light fw-bold">
								Tú eliges que ejercicio quieres hacer
							</span>
							<span className="exercise-text">
								<span className="mb-3">
									<span className="fw-bold"> Tiempo total de ejecución:</span>
									<br></br> Depende de ti
								</span>
								<br></br>
								<span>
									<span className="fw-bold">Nivel de dificultad:</span> Depende
								</span>
							</span>
							<Link to="/customize">
								<Button className="w-100 boton-ejercicio" size="lg">
									Elige este plan
								</Button>
							</Link>
						</Card.Text>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
};
