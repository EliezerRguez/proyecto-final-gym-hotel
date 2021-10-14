import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { CardGroup } from "react-bootstrap";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Image from "react-bootstrap/Image";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

import "../../styles/home.scss";

export const Profile = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<h1>PROFILE</h1>
			<CardGroup className="mb-4">
				<Card>
					<Card.Img variant="top" src="holder.js/100px160" />
					<Card.Body>
						<Card.Title>Imagen plan chulo elegido</Card.Title>
					</Card.Body>
				</Card>
				<Card>
					<Card.Body>
						<Card.Text>Este es el plan que vas a relizar durante tu estancia en el hotel </Card.Text>

						<small className="text-muted">
							<Link to="/personal-plan">
								<Button variant="outline-dark">Empezar</Button>
							</Link>
						</small>
					</Card.Body>
				</Card>
			</CardGroup>

			<Card className="mb-4">
				<Card.Img variant="top" src="holder.js/100px160" />
				<Card.Body>
					<Card.Title>Imagen tiempo</Card.Title>
					aquí se puede ver el tiempo de los ejercicios o el acumulado o como funciona o barra de progreso
					<Link to="/time">
						<Button variant="outline-dark">Saber más</Button>
					</Link>
				</Card.Body>
			</Card>
			<Row className="mb-4">
				<h1> AWARDS </h1>
				<Container>
					<Row className="mx-3">
						<Col xs={4} md={4}>
							<Image src="holder.js/171x180" roundedCircle />
						</Col>
						<Col xs={4} md={4}>
							<Image src="holder.js/171x180" roundedCircle />
						</Col>
						<Col xs={4} md={4}>
							<Image src="holder.js/171x180" thumbnailCircle />
						</Col>
					</Row>
					<Row className="mx-3">
						<Col xs={4} md={4}>
							<Image src="holder.js/171x180" roundedCircle />
						</Col>
						<Col xs={4} md={4}>
							<Image src="holder.js/171x180" roundedCircle />
						</Col>
						<Col xs={4} md={4}>
							<Image src="holder.js/171x180" thumbnailCircle />
						</Col>
					</Row>
					<Row className="mx-3">
						<Col xs={4} md={4}>
							<Image src="holder.js/171x180" roundedCircle />
						</Col>
						<Col xs={4} md={4}>
							<Image src="holder.js/171x180" roundedCircle />
						</Col>
						<Col xs={4} md={4}>
							<Image src="holder.js/171x180" thumbnailCircle />
						</Col>
					</Row>
				</Container>
			</Row>
		</div>
	);
};
