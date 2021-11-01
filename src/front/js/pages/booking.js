import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/booking.scss";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom";

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
	const token = localStorage.getItem("jwt-token");
	let history = useHistory();

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
				month: month,
				minutes: minutes,
				gym: gym
			})
		});
		console.log(response);
		const responseJson = await response.json();
		history.push("/profile");
		return responseJson;
	}

	const NewDate = date => {
		setShowModal(true);
		setYear(date.getFullYear());
		setMonth(date.getMonth());
		setDay(date.getDate());
		console.log("!!!", { date });
	};

	function hourClicked(hour, minutes) {
		setHour(hour);
		setMinutes(minutes);
	}

	console.log(date);
	return (
		<div className="text-center mt-5">
			<h1>BOOKING</h1>
			<Link to="/profile">Profile</Link>
			<div>
				<Calendar value={date} onChange={NewDate} className="calendar" />
			</div>
			{showModal ? (
				<Card style={{ width: "100vw" }}>
					<Card.Body>
						<Card.Title>Horas Disponibles</Card.Title>
						<div>
							<Button
								className="boton-hours"
								onClick={event => {
									hourClicked(10, 0);
								}}>
								10:00-10:45
							</Button>
							<Button
								className="boton-hours"
								onClick={event => {
									hourClicked(10, 45);
								}}>
								10:45-11:30
							</Button>
							<Button
								className="boton-hours"
								onClick={event => {
									hourClicked(11, 30);
								}}>
								11:30-12:15
							</Button>
							<Button
								className="boton-hours"
								onClick={event => {
									hourClicked(12, 15);
								}}>
								12:15-13:00
							</Button>
							<Button
								className="boton-hours"
								onClick={event => {
									hourClicked(16, 0);
								}}>
								16:00-16:45
							</Button>
							<Button
								className="boton-hours"
								onClick={event => {
									hourClicked(16, 45);
								}}>
								16:45-17:30
							</Button>
							<Button
								className="boton-hours"
								onClick={event => {
									hourClicked(17, 30);
								}}>
								17:30-18:15
							</Button>
							<Button
								className="boton-hours"
								onClick={event => {
									hourClicked(18, 15);
								}}>
								18:15-19:00
							</Button>
							<Button
								className="boton-hours"
								onClick={event => {
									hourClicked(21, 0);
								}}>
								21:00-21:45
							</Button>
							<Button
								className="boton-hours"
								onClick={event => {
									hourClicked(21, 45);
								}}>
								21:45-22:30
							</Button>
						</div>
						<div>
							<Button variant="primary" className="book" onClick={createBooking}>
								Reservar
							</Button>
						</div>
					</Card.Body>
				</Card>
			) : null}
		</div>
	);
};
