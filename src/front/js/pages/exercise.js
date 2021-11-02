import React, { useState, useEffect } from "react";
import Time from "../component/timer";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/ejercicio.scss";

export const Exercise = () => {
	const [exercise, setExercise] = useState([]);
	const params = useParams();

	async function getSingleExercise() {
		const response = await fetch(process.env.BACKEND_URL + `/api/exercises/${params.id_exercise}`);
		console.log(response);
		const responseJson = await response.json();
		setExercise(responseJson);
		console.log(responseJson, "este");
		console.log(responseJson.video, "este");
	}

	useEffect(() => {
		getSingleExercise();
	}, []);

	return (
		<div className="p-4">
			<Container key={exercise.id}>
				<span>Ejercicio {exercise.id}</span>
				<h1>{exercise.name}</h1>
				<Row>
					<Col xs={12} className="mb-4">
						<iframe
							width="100%"
							height="100%"
							src={exercise.video}
							title="YouTube video player"
							className="video-ejercicio"></iframe>
					</Col>
				</Row>
				<Row>
					<Col xs={12} className="mb-4 tiempo-ejercicio">
						<span>
							<span className="fw-bold">Duración del ejercicio:</span> {exercise.time} minutos
						</span>
					</Col>
					<Col xs={12} className="mb-4 detalles-ejercicio">
						<span>{exercise.detail}</span>
					</Col>
				</Row>
				<Row>
					<Col xs={12} className="px-2">
						<Time />
					</Col>
				</Row>
				<Row>
					<Col xs={6} className="text-center my-4">
						<Button variant="outline-primary">
							<Link to={`/plan/${params.id_plan}/exercises`}>List of exercises</Link>
						</Button>
					</Col>
					<Col xs={6} className="text-center my-4">
						<Link to={`/exercises/${exercise.id}`}>Next exercise</Link>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
