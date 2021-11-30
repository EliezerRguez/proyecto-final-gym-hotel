import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import "../../styles/profile.scss";
import swal from "sweetalert";

export const Profile = () => {
	const [plan, setPlan] = useState([]);
	const [time, setTime] = useState([]);
	const [show, setShow] = useState(false);
	const [awards, setAwards] = useState([]);
	const [bookings, setBookings] = useState([]);
	const [bookingIdToDelete, setBookingIdToDelete] = useState(null);

	const [awardselected, setAwardselected] = useState(null);
	const { store, actions } = useContext(Context);
	const token = localStorage.getItem("jwt-token");

	const handleClose = () => setShow(false);
	const handleShow = awardselected => {
		setAwardselected(awardselected);
		setShow(true);
	};

	async function getPlan() {
		const response = await fetch(process.env.BACKEND_URL + "/api/profile", {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			}
		});

		const responseJson = await response.json();
		setPlan(responseJson.plan);
	}

	async function getAward() {
		const response = await fetch(process.env.BACKEND_URL + "/api/awards");
		const responseJson = await response.json();
		setAwards(responseJson);
	}

	async function getTime() {
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

	function getBookingDate({ year, month, day, hour, minutes }) {
		return new Date(year, month - 1, day, hour, minutes);
	}

	function bookingSorter(a, b) {
		return getBookingDate(a) - getBookingDate(b);
	}

	function formatBooking(booking) {
		return getBookingDate(booking).toLocaleString("sv");
	}

	const sortedBookings = [...bookings].sort(bookingSorter);

	function selectBooking(yearSelected, monthSelected, daySelected) {
		let actualDate = new Date();
		let actualYear = actualDate.getFullYear();
		let actualMonth = actualDate.getMonth() + 1;
		let actualDay = actualDate.getDate();

		console.log(yearSelected, monthSelected, daySelected);
		if (yearSelected < actualYear) {
			return false;
		}
		if (yearSelected > actualYear) {
			return true;
		}
		if (monthSelected < actualMonth) {
			return false;
		}
		if (monthSelected > actualMonth) {
			return true;
		}
		if (daySelected < actualDay) {
			return false;
		}
		if (daySelected >= actualDay) {
			return true;
		}
	}

	async function deleteBooking(bookingID) {
		try {
			let response = await fetch(process.env.BACKEND_URL + `/api/bookings/${bookingID}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token
				},
				method: "DELETE"
			});
			const responseJson = response.json();
			getBooking();
		} catch (error) {
			console.log("un error"); //informar al usuario
			console.log(error);
		}
	}

	async function deleteBookingAlert(bookingID) {
		let willDelete = await swal({
			title: "¿Estás seguro de que quieres eliminar la reserva?",
			icon: "warning",
			buttons: true,
			dangerMode: true
		});
		if (willDelete) {
			deleteBooking(bookingID);
			swal("Tu reserva se ha eliminado", {
				icon: "success",
				button: false,
				timer: "2000"
			});
		} else {
			swal("Tu reserva no se ha eliminado", { button: false, timer: "2000" });
		}
	}

	useEffect(() => {
		getPlan();
		getAward();
		getTime();
		getBooking();
		actions.setShowNavbar(true);
	}, []);

	const formatTime = () => {
		const getSeconds = `0${time % 60}`.slice(-2);
		const minutes = `${Math.floor(time / 60)}`;
		const getMinutes = `0${minutes % 60}`.slice(-2);
		const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

		return `${getHours} : ${getMinutes} : ${getSeconds}`;
	};
	let filteredBookings = sortedBookings.filter(sortedBooking => {
		if (selectBooking(sortedBooking.year, sortedBooking.month, sortedBooking.day)) {
			return true;
		} else {
			return false;
		}
	});
	return (
		<div className="container p-4 escritorio">
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
						{filteredBookings.map((booking, index) => {
							return (
								<ul key={booking.id}>
									<li>
										<span className="reserva-profile">
											{selectBooking(booking.year, booking.month, booking.day)
												? `Tu
											reserva: ${booking.day}/${booking.month}/${booking.year} a las ${`0${booking.hour}`.slice(-2)}:
											${`0${booking.minutes % 60}`.slice(-2)}`
												: null}
										</span>
										{selectBooking(booking.year, booking.month, booking.day) ? (
											<i
												onClick={() => {
													setBookingIdToDelete(booking.id);
													console.log(booking.id + "holii");
													deleteBookingAlert(booking.id);
												}}
												className="fas fa-trash-alt delete boton-cancelar"></i>
										) : null}
									</li>
								</ul>
							);
						})}
					</Card.Title>
				</Card.Body>
			</Card>
			<Card className="mb-4 time-profile text-center">
				<Card.Body>
					<span>
						<span className="fw-bold">Tiempo total:</span> {formatTime()}
					</span>
				</Card.Body>
			</Card>
			<Row className="mb-4">
				<h3> Insignias conseguidas </h3>
				<Container>
					<Row className="mx-3">
						{awards.map(award => {
							if (time >= award.total_time) {
								return (
									<Col xs={4} sm={1} key={award.id} className="mb-3 mr-3 text-center">
										<Image
											src={require(`../../img/icon/${award.image_on}.png`)}
											onClick={() => {
												handleShow(award);
											}}
											className="insignia-profile"
										/>
									</Col>
								);
							} else {
								return (
									<Col xs={4} sm={1} key={award.id} className="mb-3 mr-3 text-center">
										<Image
											src={require(`../../img/icon/${award.image_off}.png`)}
											width="75"
											className="insignia-profile"
										/>
									</Col>
								);
							}
						})}
					</Row>
					<Modal show={show} onHide={handleClose}>
						<Modal.Body>
							{awardselected != null ? (
								<Row>
									<Col xs={6} sm={3}>
										<Image
											className="qr"
											src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${awardselected.name}`}></Image>
									</Col>
									<Col xs={6} sm={9}>
										<h5>{awardselected.name}</h5>
										<p>{awardselected.discount}% de descuento</p>
									</Col>
								</Row>
							) : null}
						</Modal.Body>
					</Modal>
				</Container>
			</Row>
		</div>
	);
};
