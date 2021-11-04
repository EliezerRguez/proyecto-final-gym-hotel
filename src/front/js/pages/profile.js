import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
//import Accordion from "react-bootstrap/Accordion";
import Image from "react-bootstrap/Image";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import "../../styles/profile.scss";

export const Profile = () => {
	const [plan, setPlan] = useState([]);
	const [time, setTime] = useState([]);
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

	const formatTime = () => {
		const getSeconds = `0${time % 60}`.slice(-2);
		const minutes = `${Math.floor(time / 60)}`;
		const getMinutes = `0${minutes % 60}`.slice(-2);
		const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

		return `${getHours} : ${getMinutes} : ${getSeconds}`;
	};

	return (
		<div className="container p-4">
			<div key={plan.id}>
				<span>Empieza tu plan </span>
				<h5>{plan.name}</h5>
				<Card className="profile-plan">
					<Card.Body>
						<Card.Text className="faldon-profile-plan">
							<Link to={`/plan/${plan.id}/exercises`}>
								<Button className="boton-profile">Empezar</Button>
							</Link>
						</Card.Text>
					</Card.Body>
				</Card>
			</div>

			<Card className="my-4 booking-profile">
				<Card.Body>
					<Card.Title>
						{bookings.map(booking => {
							return (
								<span key={booking.id}>
									{" "}
									Tu reserva: {booking.day}/{booking.month}/{booking.year} a las {booking.hour}:
									{booking.minutes}
								</span>
							);
						})}
					</Card.Title>
				</Card.Body>
			</Card>
			<Card className="mb-4 time-profile">
				<Card.Body>
					<Row>
						<Col>
							<span>
								<span className="fw-bold">Tiempo total:</span> {formatTime()}
							</span>
						</Col>
						<Col>
							<Link to="/time">
								<Button className="boton-profile">Saber más</Button>
							</Link>
						</Col>
					</Row>
				</Card.Body>
			</Card>
			<Row className="mb-4">
				<h3> Insignias conseguidas </h3>
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
