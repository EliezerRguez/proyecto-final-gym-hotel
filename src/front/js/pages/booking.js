import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
//import "../../styles/home.scss";

import Calendar from "react-calendar";

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
				<Calendar value={date} onClickDay={onClickDay} />
			</div>
			{showModal ? (
				<div>
					<p>Hola soy un modal</p>
				</div>
			) : null}
		</div>
	);
};
