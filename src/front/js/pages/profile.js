import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { CardGroup } from "react-bootstrap";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
//import Accordion from "react-bootstrap/Accordion";
import Image from "react-bootstrap/Image";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import "../../styles/home.scss";

export const Profile = () => {
	const [plan, setPlan] = useState([]);
	const [time, setTime] = useState([]);
	const { store, actions } = useContext(Context);
	const token = localStorage.getItem("jwt-token");
	const [show, setShow] = useState(false);
	const [awards, setAwards] = useState([]);
	const [bookings, setBookings] = useState([]);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	async function getPlan() {
		const response = await fetch(process.env.BACKEND_URL + "/api/profile", {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			}
		});
		console.log(response, "mira esto tb");
		const responseJson = await response.json();
		setPlan(responseJson.plan);
		console.log(responseJson.plan, "mira aqui");
	}

	async function getAward() {
		const response = await fetch(process.env.BACKEND_URL + "/api/awards");
		const responseJson = await response.json();
		setAwards(responseJson);
	}

	async function getClientTime() {
		const response = await fetch(process.env.BACKEND_URL + "/api/get-client-time", {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			}
		});
		const responseJson = await response.json();
		setTime(responseJson);
	}

	async function getBooking() {
		const response = await fetch(process.env.BACKEND_URL + "/api/booking", {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			}
		});
		const responseJson = await response.json();
		setBookings(responseJson);
	}

	useEffect(() => {
		getPlan();
		getAward();
		getClientTime();
		getBooking();
	}, []);

	//REALIZAR FECTH DE LOS DATOS DE USUARIO CON EL PLAN ELEGIDO PARA COGER LOS DATOS DEL PLAN
	//REALIZAR FECHT DEL PLAN ELEGIDO
	//crear if award.time >= time.total_time mostrar imagen a color
	return (
		<div className="container">
			<h1>PROFILE</h1>
			<CardGroup className="mb-4" key={plan.id}>
				<Card>
					<Card.Img variant="top" src="holder.js/100px160" />
					<Card.Body>
						<h5>{plan.name}</h5>
						<Card.Title>Imagen plan chulo elegido</Card.Title>
					</Card.Body>
				</Card>
				<Card>
					<Card.Body>
						<Card.Text>Este es el plan que vas a relizar durante tu estancia en el hotel </Card.Text>

						<small className="text-muted">
							<Link to={`/plan/${plan.id}/exercises`}>
								<Button variant="outline-dark">Empezar</Button>
							</Link>
						</small>
					</Card.Body>
				</Card>
			</CardGroup>
			<Card className="mb-4">
				<Card.Body>
					<Card.Title>
						{bookings.map(booking => {
							return (
								<h5 key={booking.id}>
									{" "}
									Your Booking time is: {booking.day} of {booking.month} at {booking.hour}{" "}
									{booking.minutes}{" "}
								</h5>
							);
						})}
					</Card.Title>
				</Card.Body>
			</Card>
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
						{awards.map(award => {
							if (time >= award.total_time) {
								return (
									<Col xs={4} md={1} key={award.id}>
										<Image
											src={require(`../../img/${award.image_on}.png`)}
											width="75"
											onClick={handleShow}
											className="mb-3"
										/>
									</Col>
								);
							} else {
								return (
									<Col xs={4} md={1} key={award.id}>
										<Image
											src={require(`../../img/${award.image_off}.png`)}
											width="75"
											className="mb-3"
										/>
									</Col>
								);
							}
						})}
						<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>Cógigo descuento</Modal.Title>
							</Modal.Header>
							<Modal.Body>valido en restaurante, sobre productos limitados</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={handleClose}>
									Close
								</Button>
								<Button variant="primary" onClick={handleClose}>
									Save Changes
								</Button>
							</Modal.Footer>
						</Modal>
					</Row>
				</Container>
			</Row>
		</div>
	);
};
