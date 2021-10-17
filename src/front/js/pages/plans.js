import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../styles/home.scss";

export const Plans = () => {
	const [plans, setPlans] = useState([]);
	const { store, actions } = useContext(Context);

	async function getPlans() {
		const response = await fetch(process.env.BACKEND_URL + "/api/plans");

		const responseJson = await response.json();
		setPlans(responseJson.results);
	}
	useEffect(() => {
		getPlans();
	}, []);
	return (
		<div className="container">
			<h1>PLAN</h1>
			<div className="row flex-nowrap ">
				{" "}
				{plans.map(plan => {
					return (
						<div className="card col-3 m-4" key={plan.name}>
							<button
								className="fas fa-heart"
								onClick={() => {
									actions.addPlan(plan.name);
								}}
							/>
							<Link to="/booking">BOOKING</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
};
