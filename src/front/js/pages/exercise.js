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
	const [exerciseExist, setExerciseExist] = useState([]);
	const [next_exercise_id, setNext_exercise_id] = useState("");
	const token = localStorage.getItem("jwt-token");
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
		getAllExercises();
	}, []);

	useEffect(() => {
		SaveItAll(exerciseExist);
	}, [exerciseExist, exercise]);

	useEffect(() => {
		getSingleExercise();
	}, [params]);

	async function getAllExercises() {
		const response = await fetch(process.env.BACKEND_URL + `/api/plans/${params.id_plan}/exercises`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			}
		});
		console.log(response);
		const responseJson = await response.json();
		setExerciseExist(responseJson);

		console.log(responseJson, "Esto que es");
	}

	function SaveItAll(exercisesInPlan) {
		if (exercise.id === undefined || exercisesInPlan.length == 0) {
			return;
		}

		console.log(exercisesInPlan, "QUE MIERDA DE ARRAY ES ESE");
		let position = findPosition(exercisesInPlan, exercise.id);
		console.log(position, "position");
		let nextPositionExercise = position + 1;
		console.log(exercisesInPlan[nextPositionExercise]);
		setNext_exercise_id(exercisesInPlan[nextPositionExercise].id);
		return exercisesInPlan[nextPositionExercise];
	}

	function findPosition(array, exercise_id) {
		console.log(exercise_id, "exerciseid");
		return array.findIndex(exercise => exercise.id == exercise_id);
	}

	return (
		<div className="p-4">
			<Container key={exercise.id}>
				<span>Ejercicio {exercise.id}</span>
				<h1>{exercise.name}</h1>
				<Row>
					<Col xs={12} className="mb-4 p-0">
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
						<p>
							<span className="fw-bold">Duración del ejercicio:</span> {exercise.time} minutos
						</p>
						<p>{exercise.detail}</p>
					</Col>
				</Row>
				<Row>
					<Col xs={12} className="px-2">
						<Time />
					</Col>
				</Row>
				<Row>
					<Col xs={6} className="text-center my-4 boton-lista">
						<Button>
							<Link to={`/plan/${params.id_plan}/exercises`}>Lista</Link>
						</Button>
					</Col>
					<Col xs={6} className="text-center my-4 boton-next">
						<Button>
							<Link to={`/plan/${params.id_plan}/exercises/${next_exercise_id}`}>Siguiente</Link>
						</Button>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
