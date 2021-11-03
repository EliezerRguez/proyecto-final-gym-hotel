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
		<div className="mt-5">
			<h1 className="text-center">Tu plan de trabajo</h1>
			<div className="carouselCards">
				{exercises.map(exercise => {
					return (
						<Card className="personal-plan" key={exercise.id}>
							<Card.Img src={require(`../../img/exercises/${exercise.imagen}.jpg`)} />
							<Card.Body>
								<Card.Text>
									<span className="exercise-title text-light fw-bold">{exercise.name}</span>
									<span className="exercise-text">
										<span className="exercise-subtitle fw-bold">Tiempo total de ejecución: </span>
										<br></br>
										{exercise.time} minutos{" "}
									</span>
									<Link to={`/plan/${params.id}/exercises/${exercise.id}`}>
										<Button className="w-100 boton-ejercicio fw-bold">Apptivate!</Button>
									</Link>
								</Card.Text>
							</Card.Body>
						</Card>
					);
				})}
			</div>
		</div>
	);
};
