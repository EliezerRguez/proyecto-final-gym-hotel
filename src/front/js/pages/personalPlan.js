import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../styles/plan.scss";

export const PersonalPlan = () => {
	const { store, actions } = useContext(Context);
	const [exercises, setExercises] = useState([]);
	const token = localStorage.getItem("jwt-token");
	const params = useParams();
	console.log(params);
	async function getExercises() {
		const response = await fetch(process.env.BACKEND_URL + `/api/plans/${params.id}/exercises`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			}
		});
		console.log(response);
		const responseJson = await response.json();
		setExercises(responseJson);
		console.log(responseJson);
	}

	useEffect(() => {
		getExercises();
	}, []);

	return (
		<div className="text-center mt-5">
			<h1>Tu plan de trabajo</h1>
			<div className="carouselCards">
				{exercises.map(exercise => {
					return (
						<Card className="personal-plan" key={exercise.id}>
							<Card.Body>
								<Card.Text>
									Ejercicio: {exercise.name}
									<p>Tiempo total de ejecución: {exercise.time} minutos </p>
									<Link to={`/plan/${params.id}/exercises/${exercise.id}`}>
										<Button variant="outline-dark">Apptivate!</Button>
									</Link>
								</Card.Text>
							</Card.Body>
						</Card>
					);
				})}
			</div>
			;
		</div>
	);
};
