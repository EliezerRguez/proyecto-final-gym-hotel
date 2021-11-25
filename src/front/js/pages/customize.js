import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import "../../styles/customize.scss";

export const Customize = () => {
	const { store, actions } = useContext(Context);
	const [exercises, setExercises] = useState([]);
	//const [selectExercise, setSelectExercise] = useState("");
	const token = localStorage.getItem("jwt-token");

	async function getAllExercises() {
		const response = await fetch(process.env.BACKEND_URL + "/api/define-customized", {
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
		getAllExercises();
		actions.setShowNavbar(true);
	}, []);

	async function SaveIt() {
		const response = await fetch(process.env.BACKEND_URL + "/api/customized-exercises", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			},
			body: JSON.stringify({
				exercises: store.exercises
			})
		});

		const responseJson = await response.json();
		return responseJson;
	}

	const handledClick = exerciseId => {
		const checkBox = document.querySelector(`#checkBox${exerciseId}`);
		checkBox.checked = !checkBox.checked;
		actions.addExercises(exerciseId);
	};

	return (
		<div className="p-4 escritorio container">
			<h1>Elige tus ejercicios</h1>
			<div className="carouselCards">
				{exercises.map(exercise => {
					return (
						<Card className="personal-plan" key={exercise.id} onClick={() => handledClick(exercise.id)}>
							<Card.Img src={require(`../../img/exercises/${exercise.imagen}.jpg`)} />
							<Card.Body>
								<Card.Text>
									<span className="exercise-title text-light fw-bold">{exercise.name}</span>
									<span className="exercise-text">
										<span className="exercise-subtitle fw-bold">Tiempo total de ejecución: </span>
										<br></br>
										{exercise.time} minutos{" "}
									</span>
									<Form.Check
										id={`checkBox${exercise.id}`}
										onClick={() => handledClick(exercise.id)}
										className="inline"
										aria-label="option 1"
										value="ok"
									/>
								</Card.Text>
							</Card.Body>
						</Card>
					);
				})}
			</div>
			<Row>
				<Col xs={12} sm={6}>
					<Link to="/booking">
						<Button className="w-100 boton-ejercicio fw-bold mt-4" onClick={SaveIt}>
							Añade los ejercicios a mi plan
						</Button>
					</Link>
				</Col>
				<Col xs={12} sm={6}>
					<Link to="/plans">
						<Button className="w-100 boton-volver-customize">Volver</Button>
					</Link>
				</Col>
			</Row>
		</div>
	);
};
