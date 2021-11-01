import React, { useState, useEffect } from "react";
import Time from "../component/timer";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Exercise = () => {
	const [exercise, setExercise] = useState([]);
	const [nextExercises, setNextExercises] = useState("");
	const [exerciseExist, setExerciseExist] = useState(false);
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

	useEffect(() => {
		let position = exercise.findIndex(exercise => {
			return exercise.id === nextExercises;
		});

		if (position === -1) {
			setExerciseExist(false);
		} else {
			setExerciseExist(true);
		}
	}, [setNextExercises]);

	function goToNextExercise(exercise, exercise_id) {
		let position = (position = exercise.findIndex(exercise == 1));
		if (position === -1) {
			setExercise([...exercise, exercise.id++]);
			setNextExercises("");
		}
	}

	return (
		<div className="text-center mt-5">
			<Container key={exercise.id}>
				<Row>
					<Col xs={6} className="mb-4">
						<h1>{`EXERCISE ${exercise.id}`}</h1>
					</Col>
					<Col xs={6} className="mb-4">
						<i className="fas fa-star"></i>
						<i className="fas fa-star"></i>
						<i className="fas fa-star"></i>
						<i className="fas fa-star"></i>
						<i className="fas fa-star"></i>
					</Col>
				</Row>
				<Row>
					<Col xs={12} className="mb-4">
						<iframe width="100%" height="100%" src={exercise.video} title="YouTube video player"></iframe>
					</Col>
				</Row>
				<Row>
					<Col xs={4} className="mb-4">
						<span>{exercise.time}</span>
					</Col>
					<Col xs={4} className="mb-4">
						<span>{exercise.detail}</span>
					</Col>
					<Col xs={4} className="mb-4">
						<span>10 reps each</span>
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
						<Button onClick={goToNextExercise}> prueba esto</Button>
						<Link to={`/plan/${params.id_plan}/exercises/${params.id_exercise}`}>Next exercise</Link>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
