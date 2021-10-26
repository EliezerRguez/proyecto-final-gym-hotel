import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/booking.scss";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const Booking = () => {
	const { store, actions } = useContext(Context);
	const [finalDate, setFinalDate] = useState(null);
	const [date, setDate] = useState(new Date());
	const [showModal, setShowModal] = useState(false);

	const NewDate = date => {
		setShowModal(true);
	};
	function NewHour(event) {
		setHour(event.target.value);
		setMinutes(event.target.value);
	}

	async function createBooking() {
		const responsive = await fetch(`${process.env.BACKEND_URL}/api/create-booking`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				date: date
			})
		});
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
							<Button className="boton-hours" onClick={NewHour}>
								10:00-10:45
							</Button>
							<Button className="boton-hours" onClick={NewHour}>
								10:45-11:30
							</Button>
							<Button className="boton-hours" onClick={NewHour}>
								11:30-12:15
							</Button>
							<Button className="boton-hours" onClick={NewHour}>
								12:15-13:00
							</Button>
							<Button className="boton-hours" onClick={NewHour}>
								16:00-16:45
							</Button>
							<Button className="boton-hours" onClick={NewHour}>
								16:45-17:30
							</Button>
							<Button className="boton-hours" onClick={NewHour}>
								17:30-18:15
							</Button>
							<Button className="boton-hours" onChange={NewHour}>
								18:15-19:00
							</Button>
							<Button className="boton-hours" onChange={NewHour}>
								21:00-21:45
							</Button>
							<Button className="boton-hours" onChange={NewHour}>
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
