import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../styles/home.scss";

export const PlanConfirmation = () => {
	const [myplan, setMyplan] = useState([]);
	const { store, actions } = useContext(Context);
	const token = localStorage.getItem("jwt-token");

	async function getConfirmPlan() {
		const response = await fetch(process.env.BACKEND_URL + "/api/plan-selected", {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			}
		});
		console.log(response);
		const responseJson = await response.json();
		setMyplan(responseJson);
		console.log(responseJson);
	}
	useEffect(() => {
		getConfirmPlan();
	}, []);
	return (
		<div className="container">
			<h1>PLAN</h1>

			<div className="row flex-nowrap ">
				<Card className="m-4">
					<h5> Has seleccionado el plan: </h5>
					<h5>{myplan.id}</h5>
					<h5>{myplan.name}</h5>

					<h5> A entrenar! </h5>
					<Link to="/booking">Reserva tu entrenamiento</Link>
				</Card>
			</div>
		</div>
	);
};
