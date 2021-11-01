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

	return (
		<div className="text-center mt-5">
			<h1>CUSTOMIZE</h1>
			<Link to="/booking">Book</Link>
			{exercises.map(exercise => {
				return (
					<div className="text-center mt-5 container" key={exercise.id}>
						<Card className="mt-2">
							<Card.Header className="text-start" as="h5">
								{exercise.name}
							</Card.Header>
							<Row>
								<Card.Body>
									<div className="info-plan">
										{exercise.detail}
										{exercise.time}
										<div className="info-check">
											<Col sm={2}>
												<Form.Check
													onChange={() => {
														actions.addExercises(exercise.id);
													}}
													className="inline"
													aria-label="option 1"
													value="ok"
												/>
											</Col>
										</div>
									</div>
								</Card.Body>
							</Row>
						</Card>
					</div>
				);
			})}
			<Link to="/profile">
				<Button onClick={SaveIt}>Add exercises to my plan</Button>
			</Link>
			; ;
		</div>
	);
};
