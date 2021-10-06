import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.scss";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

export const Customize = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 container">
			<h1>Customize</h1>
			<Link to="/booking">Book</Link>
			<Card className="mt-2">
				<Card.Header className="text-start" as="h5">
					Featured
				</Card.Header>
				<Row>
					<Card.Body>
						<Col sm={8}>
							<Card.Text className="text-start">With supporting</Card.Text>
						</Col>
						{["radio"].map(type => (
							<div key={`default-${type}`}>
								<Col sm={2}>
									<Form.Check type={type} id={`default-${type}`} />
								</Col>
							</div>
						))}
					</Card.Body>
				</Row>
			</Card>
		</div>
	);
};
