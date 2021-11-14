import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/booking.scss";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import swal from "sweetalert";

export const Booking = () => {
	const { store, actions } = useContext(Context);

	const [date, setDate] = useState(new Date());
	const [day, setDay] = useState(0);
	const [year, setYear] = useState(0);
	const [hour, setHour] = useState(0);
	const [month, setMonth] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [gym, setGym] = useState(1);
	const [showModal, setShowModal] = useState(false);
	const [colorCalendar, setColorCalendar] = useState("");

	const token = localStorage.getItem("jwt-token");
	let history = useHistory();

	const confirmationBookingAlert = () => {
		swal({ text: "Reserva realizada", icon: "success", button: false, timer: "2000" });
	};

	const confirmationBookingAlertError = () => {
		swal({ text: "Selecciona una hora para reservar", icon: "error", button: false, timer: "2000" });
	};

	function validateInput() {
		console.log(hour, minutes);
		if (hour != 0) {
			createBooking();
		} else {
			confirmationBookingAlertError();
		}
	}

	function selectBooking(yearSelected, monthSelected, daySelected) {
		let actualDate = new Date();
		let actualYear = actualDate.getFullYear();
		let actualMonth = actualDate.getMonth() + 1;
		let actualDay = actualDate.getDate();
		if (yearSelected == actualYear) {
			if (monthSelected > actualMonth) {
				setShowModal(true);
			} else if (monthSelected == actualMonth && daySelected >= actualDay) {
				setShowModal(true);
			} else {
				setShowModal(false);
			}
		} else if (yearSelected > actualYear) {
			setShowModal(true);
		} else {
			setShowModal(false);
		}
	}

	async function createBooking() {
		const response = await fetch(process.env.BACKEND_URL + "/api/create-booking", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			},
			body: JSON.stringify({
				day: day,
				year: year,
				hour: hour,
				month: month + 1,
				minutes: minutes,
				gym: gym
			})
		});
		confirmationBookingAlert();
		const responseJson = await response.json();
		history.push("/profile");
		return responseJson;
	}

	const NewDate = date => {
		setHour(0);
		setMinutes(0);
		setYear(date.getFullYear());
		setMonth(date.getMonth());
		setDay(date.getDate());
		selectBooking(date.getFullYear(), date.getMonth() + 1, date.getDate());
		colorCalendar.classList.remove("color-date-now");
	};

	function hourClicked(hour, minutes) {
		setHour(hour);
		setMinutes(minutes);
	}

	useEffect(() => {
		actions.setShowNavbar(true);
		let colorDateNow = document.querySelector(".react-calendar__tile--now");
		setColorCalendar(colorDateNow);
		colorDateNow.classList.add("color-date-now");
	}, []);

	return (
		<div className="text-center pt-3 escritorio">
			<h2>HAZ TU RESERVA</h2>
			<div>
				<Calendar value={date} onChange={NewDate} className="calendar" />
			</div>
			{showModal ? (
				<Card className="card-hours">
					<Card.Body>
						<Card.Title>Horas Disponibles</Card.Title>
						<div>
							<Row>
								<Col xs={4}>
									<Button
										className="boton-hours"
										onClick={event => {
											hourClicked(10, 0);
										}}>
										10:00-10:45
									</Button>
								</Col>
								<Col xs={4}>
									<Button
										className="boton-hours"
										onClick={event => {
											hourClicked(10, 45);
										}}>
										10:45-11:30
									</Button>
								</Col>
								<Col xs={4}>
									<Button
										className="boton-hours"
										onClick={event => {
											hourClicked(11, 30);
										}}>
										11:30-12:15
									</Button>
								</Col>
								<Col xs={4}>
									<Button
										className="boton-hours"
										onClick={event => {
											hourClicked(12, 15);
										}}>
										12:15-13:00
									</Button>
								</Col>
								<Col xs={4}>
									<Button
										className="boton-hours"
										onClick={event => {
											hourClicked(16, 0);
										}}>
										16:00-16:45
									</Button>
								</Col>
								<Col xs={4}>
									<Button
										className="boton-hours"
										onClick={event => {
											hourClicked(16, 45);
										}}>
										16:45-17:30
									</Button>
								</Col>
								<Col xs={4}>
									<Button
										className="boton-hours"
										onClick={event => {
											hourClicked(17, 30);
										}}>
										17:30-18:15
									</Button>
								</Col>
								<Col xs={4}>
									<Button
										className="boton-hours"
										onClick={event => {
											hourClicked(18, 15);
										}}>
										18:15-19:00
									</Button>
								</Col>
								<Col xs={4}>
									<Button
										className="boton-hours"
										onClick={event => {
											hourClicked(19, 0);
										}}>
										19:00-19:45
									</Button>
								</Col>
								<Col xs={4}>
									<Button
										className="boton-hours"
										onClick={event => {
											hourClicked(19, 45);
										}}>
										19:45-20:30
									</Button>
								</Col>
								<Col xs={4}>
									<Button
										className="boton-hours"
										onClick={event => {
											hourClicked(21, 0);
										}}>
										21:00-21:45
									</Button>
								</Col>
								<Col xs={4}>
									<Button
										className="boton-hours"
										onClick={event => {
											hourClicked(21, 45);
										}}>
										21:45-22:30
									</Button>
								</Col>
							</Row>
						</div>
						<div>
							<Button className="book" onClick={validateInput}>
								Reservar
							</Button>
						</div>
					</Card.Body>
				</Card>
			) : null}
		</div>
	);
};
