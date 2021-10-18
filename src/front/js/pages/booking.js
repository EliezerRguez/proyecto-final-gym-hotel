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

	const NewDate = date => {
		setShowModal(true);
		console.log("!!!", { date });
	};

	console.log(date);
	return (
		<div className="text-center mt-5">
			<h1>BOOKING</h1>
			<Link to="/profile">Profile</Link>
			<div>
				<Calendar value={date} onChange={NewDate} className="calendar" />
			</div>
			{showModal ? (
				<div>
					<Modal.Dialog>
						<Modal.Header closeButton>
							<Modal.Title>Available Hours</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<p>All hours goes here!</p>
							<Modal.Body>
								<Button>10:00-10:45</Button>
								<Button>10:45-11:30</Button>
								<Button>11:30-12:15</Button>
								<Button>12:15-13:00</Button>
								<Button>16:00-16:45</Button>
								<Button>16:45-17:30</Button>
								<Button>17:30-18:15</Button>
								<Button>18:15-19:00</Button>
								<Button>21:00-21:45</Button>
								<Button>21:45-22:30</Button>
							</Modal.Body>
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
