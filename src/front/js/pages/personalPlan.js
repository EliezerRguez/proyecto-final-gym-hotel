import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import "../../styles/home.scss";
import { Plans } from "./plans";

export const PersonalPlan = () => {
	const { store, actions } = useContext(Context);
	const [exercises, setExercises] = useState([]);
	const token = localStorage.getItem("jwt-token");
	const params = useParams();

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
			<h1>PERSONAL PLAN</h1>
			{exercises.map(exercise => {
				return (
					<Accordion defaultActiveKey="0" flush key={exercise.id}>
						<Accordion.Item eventKey="0">
							<Accordion.Header>{`Ejercicio ${exercise.id}`}</Accordion.Header>
							<Accordion.Body>
								<p>{`Tiempo total de ejecución: ${exercise.time} minutos`}</p>
								<Link to={`/exercise/${exercise.id}`}>
									<Button variant="outline-dark">Apptivate!</Button>
								</Link>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				);
			})}
		</div>
	);
};
