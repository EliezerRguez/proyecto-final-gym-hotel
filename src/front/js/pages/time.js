import React, { useContext } from "react";
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

	return (
		<div className="text-center mt-5">
			<h1>TIME</h1>
			<Badge className="mb-2" bg="success">
				tiempo total
			</Badge>
			<ProgressBar className="mx-4" animated now={45} />
			<Badge className="my-3" bg="warning" text="dark">
				tiempo del día
			</Badge>
			<ProgressBar className="mx-4" animated now={20} />
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
