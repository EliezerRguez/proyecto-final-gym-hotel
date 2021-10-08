import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
//import "../../styles/home.scss";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const Booking = () => {
	const { store, actions } = useContext(Context);

	const [date, setDate] = useState(new Date());
	const [showModal, setShowModal] = useState(false);

	const onClickDay = date => {
		setShowModal(true);
		console.log("clickDay", { date });
	};

	console.log(date);
	return (
		<div className="text-center mt-5">
			<h1>BOOKING</h1>
			<Link to="/profile">Profile</Link>
			<div>
				<Calendar value={date} onClickDay={onClickDay} className="calendar" />
			</div>
			{showModal ? (
				<div>
					<Modal.Dialog>
						<Modal.Header closeButton>
							<Modal.Title>Available Hours</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<p>All hours goes here!</p>
						</Modal.Body>

						<Modal.Footer>
							<Button variant="secondary">Close</Button>
							<Button variant="primary">Book</Button>
						</Modal.Footer>
					</Modal.Dialog>
				</div>
			) : null}
		</div>
	);
};
