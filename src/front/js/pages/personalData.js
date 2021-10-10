import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.scss";
import { Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export const PersonalData = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<Form>
				<h1>PERSONAL DATA</h1>
				<Form.Group as={Row} className="mb-3" controlId="formHorizontalNumber">
					<Form.Label column sm={2}>
						Altura en cm
					</Form.Label>
					<Col sm={10}>
						<Form.Control type="number" placeholder="Indicanos tu altura" />
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-3" controlId="formHorizontalNumber">
					<Form.Label column sm={2}>
						Peso en kg
					</Form.Label>
					<Col sm={10}>
						<Form.Control type="number" placeholder="Indicanos tu peso" />
					</Col>
				</Form.Group>
				<fieldset>
					<Form.Group as={Row} className="mb-3">
						<Form.Label as="legend" column sm={2}>
							Género
						</Form.Label>
						<Col sm={10}>
							<Form.Check
								type="radio"
								label="Femenino"
								name="formHorizontalRadios"
								id="formHorizontalRadios1"
							/>
							<Form.Check
								type="radio"
								label="Masculino"
								name="formHorizontalRadios"
								id="formHorizontalRadios2"
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
							/>
							<Form.Check
								type="radio"
								label="Dos o tres veces por semana"
								name="formHorizontalRadios"
								id="formHorizontalRadios4"
							/>
							<Form.Check
								type="radio"
								label="Más de tres veces a la semana"
								name="formHorizontalRadios"
								id="formHorizontalRadios5"
							/>
						</Col>
					</Form.Group>
				</fieldset>

				<Form.Group as={Row} className="mb-3">
					<Col sm={{ span: 10, offset: 2 }}>
						<Link to="/homepage">
							<Button type="submit">Save</Button>
						</Link>
					</Col>
				</Form.Group>
			</Form>
		</div>
	);
};
