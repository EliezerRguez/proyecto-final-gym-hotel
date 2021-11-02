import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import "../../styles/home.scss";

export const Time = () => {
	const { store, actions } = useContext(Context);
	const [times, setTimes] = useState(" ");
	const token = localStorage.getItem("jwt-token");

	async function getTimeClient() {
		console.log("hola11");
		const response = await fetch(process.env.BACKEND_URL + "/api/get-client-time", {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			}
		});
		const responseJson = await response.json();
		setTimes(responseJson);
		console.log(responseJson);
	}
	useEffect(() => {
		getTimeClient();
	}, []);
	console.log(times);
	return (
		<div className="text-center mt-5">
			<h1>TIME</h1>
			<Badge className="mb-2" bg="success"></Badge>
			<ProgressBar className="mx-4" animated now={times} />
			<div className="mt-4">
				<h3>Las siguientes insignias que puedes ganar son:</h3>
			</div>
			<Row className="mb-4">
				<Col xs={4} md={4}>
					<Image src="holder.js/171x180" rounded />
				</Col>
				<Col xs={4} md={4}>
					<Image src="holder.js/171x180" roundedCircle />
				</Col>
				<Col xs={4} md={4}>
					<Image src="holder.js/171x180" thumbnail />
				</Col>
			</Row>

			<>
				<Button variant="primary" disabled>
					<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
					<span className="visually-hidden">Loading...</span>
				</Button>{" "}
				<Button variant="primary" disabled>
					<Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
					Loading...
				</Button>
			</>
		</div>
	);
};
