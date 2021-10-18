import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import Image from "react-bootstrap/Image";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

export const Awards = () => {
	const { store, actions } = useContext(Context);
	const { awards, setAwards } = useState(" ");

	return (
		<div className="text-center mt-5">
			<h1>INSIGNIAS</h1>
			<Container>
				<Row>
					<Col xs={4} md={4}>
						<Image src="holder.js/171x180" roundedCircle />
					</Col>
					<Col xs={4} md={4}>
						<Image src="holder.js/171x180" roundedCircle />
					</Col>
					<Col xs={4} md={4}>
						<Image src="holder.js/171x180" thumbnailCircle />
					</Col>
				</Row>
				<Row>
					<Col xs={4} md={4}>
						<Image src="holder.js/171x180" roundedCircle />
					</Col>
					<Col xs={4} md={4}>
						<Image src="holder.js/171x180" roundedCircle />
					</Col>
					<Col xs={4} md={4}>
						<Image src="holder.js/171x180" thumbnailCircle />
					</Col>
				</Row>
				<Row>
					<Col xs={4} md={4}>
						<Image src="holder.js/171x180" roundedCircle />
					</Col>
					<Col xs={4} md={4}>
						<Image src="holder.js/171x180" roundedCircle />
					</Col>
					<Col xs={4} md={4}>
						<Image src="holder.js/171x180" thumbnailCircle />
					</Col>
				</Row>
			</Container>
		</div>
	);
};
