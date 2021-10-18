import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import Image from "react-bootstrap/Image";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
//import Card from "react-bootstrap/Card";

export const Awards = () => {
	const { store, actions } = useContext(Context);
	const [awards, setAwards] = useState([]);

	async function getAward() {
		const response = await fetch(process.env.BACKEND_URL + "/api/awards");
		const responseJson = await response.json();
		setAwards(responseJson);
	}
	useEffect(() => {
		getAward();
	}, []);

	return (
		<div className="text-center mt-5">
			<h1>INSIGNIAS</h1>
			<Container>
				<Row>
					{awards.map(award => {
						return (
							<Col xs={4} md={4} key={award.id}>
								<Image src="holder.js/171x180" roundedCircle />
								<p>{award.name}</p>
								<p>{award.discount}</p>
							</Col>
						);
					})}
				</Row>
			</Container>
		</div>
	);
};
