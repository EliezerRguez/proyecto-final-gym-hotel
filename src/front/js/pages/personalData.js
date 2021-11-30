import React, { useContext, useState, useEffect } from "react";

import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

export const PersonalData = () => {
	const { store, actions } = useContext(Context);

	const [height, setHeight] = useState(" ");
	const [weight, setWeight] = useState(" ");
	const [gender, setGender] = useState("");
	const [weekly_exercise, setWeekly_exercise] = useState([]);
	const [data, setData] = useState(" ");
	let history = useHistory();

	async function getPersonalData(event) {
		event.preventDefault();
		console.log("hasta qui llega");
		const token = localStorage.getItem("jwt-token");

		const response = await fetch(process.env.BACKEND_URL + "/api/personal-data", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			},
			body: JSON.stringify({
				height: height,
				weight: weight,
				gender: gender,
				weekly_exercise: weekly_exercise
			})
		});
		console.log(response);
		const responseJson = await response.json();
		setData(responseJson);
		history.push("/plans");
	}

	useEffect(() => {
		if (store.client_token === null) history.push("/login");
	}, []);

	useEffect(() => {
		actions.setShowNavbar(false);
	}, []);

	return (
		<div className="container personal-data p-0 h-100 escritorio">
			<div className="container personal-data-area h-100">
				<Form onSubmit={getPersonalData}>
					<h1>DATOS PERSONALES</h1>
					<p>
						Para mostrarte el plan que más se adapta a tus necesidades, necesitamos conocer algunas
						características físicas y tu nivel de ejercicio diario:
					</p>
					<Form.Group as={Row} className="mb-3" controlId="formHorizontalNumber">
						<Form.Label column sm={2}>
							Altura en cm
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								type="number"
								placeholder="Indicanos tu altura"
								onChange={event => setHeight(event.target.value)}
								required
							/>
						</Col>
					</Form.Group>

					<Form.Group as={Row} className="mb-3" controlId="formHorizontalNumber">
						<Form.Label column sm={2}>
							Peso en kg
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								type="number"
								placeholder="Indicanos tu peso"
								onChange={event => setWeight(event.target.value)}
								required
							/>
						</Col>
					</Form.Group>
					<fieldset>
						<Form.Group as={Row} className="mb-3">
							<Form.Label as="legend" column sm={2}>
								Cuerpo
							</Form.Label>
							<Col sm={10}>
								<Form.Check
									type="radio"
									label="Femenino"
									name="formHorizontalRadiosgender"
									id="formHorizontalRadios1"
									onChange={event => setGender(event.target.value)}
									required
									value="Femenino"
								/>
								<Form.Check
									type="radio"
									label="Masculino"
									name="formHorizontalRadiosgender"
									id="formHorizontalRadios2"
									onChange={event => setGender(event.target.value)}
									required
									value="Masculino"
								/>
							</Col>
						</Form.Group>
					</fieldset>
					<fieldset>
						<Form.Group as={Row} className="mb-3">
							<Form.Label as="legend" column sm={2}>
								¿Cuántas veces a la semana haces ejercicio?
							</Form.Label>
							<Col sm={10}>
								<Form.Check
									type="radio"
									label="Una vez a la semana"
									name="formHorizontalRadios"
									id="formHorizontalRadios3"
									onChange={event => setWeekly_exercise(event.target.value)}
									required
									value="1"
								/>
								<Form.Check
									type="radio"
									label="Dos o tres veces por semana"
									name="formHorizontalRadios"
									id="formHorizontalRadios4"
									onChange={event => setWeekly_exercise(event.target.value)}
									required
									value="2"
								/>
								<Form.Check
									type="radio"
									label="Más de tres veces a la semana"
									name="formHorizontalRadios"
									id="formHorizontalRadios5"
									onChange={event => setWeekly_exercise(event.target.value)}
									required
									value="4"
								/>
							</Col>
						</Form.Group>
					</fieldset>

					<Form.Group as={Row} className="mb-3">
						<Col sm={{ span: 10, offset: 2 }}>
							<Button type="submit" className="w-100 button-login">
								Save
							</Button>
						</Col>
					</Form.Group>
				</Form>
			</div>
		</div>
	);
};
