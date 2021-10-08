import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.scss";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import "../../styles/customize.scss";
export const Customize = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 container">
			<h1>Customize</h1>
			<Link to="/booking">Book</Link>
			<Card className="mt-2">
				<Card.Header className="text-start" as="h5">
					Featured1
				</Card.Header>
				<Row>
					<Card.Body>
						<Col sm={8}>
							<Card.Text className="text-start">With supporting</Card.Text>
						</Col>
						<div className="info-plan">
							{["checkbox"].map(type => (
								<div key={`default-${type}`} className="info-check">
									<Col sm={2}>
										<Form.Check type={type} id={`default-${type}`} />
									</Col>
								</div>
							))}
						</div>
					</Card.Body>
				</Row>
			</Card>
			<Card className="mt-2">
				<Card.Header className="text-start" as="h5">
					Featured2
				</Card.Header>
				<Row>
					<Card.Body>
						<Col sm={8}>
							<Card.Text className="text-start">With supporting</Card.Text>
						</Col>
						<div className="info-plan">
							{["checkbox"].map(type => (
								<div key={`default-${type}`} className="info-check">
									<Col sm={2}>
										<Form.Check type={type} id={`default-${type}`} />
									</Col>
								</div>
							))}
						</div>
					</Card.Body>
				</Row>
			</Card>
			<Card className="mt-2">
				<Card.Header className="text-start" as="h5">
					Featured3
				</Card.Header>
				<Row>
					<Card.Body>
						<Col sm={8}>
							<Card.Text className="text-start">With supporting</Card.Text>
						</Col>
						<div className="info-plan">
							{["checkbox"].map(type => (
								<div key={`default-${type}`} className="info-check">
									<Col sm={2}>
										<Form.Check type={type} id={`default-${type}`} />
									</Col>
								</div>
							))}
						</div>
					</Card.Body>
				</Row>
			</Card>
			<Card className="mt-2">
				<Card.Header className="text-start" as="h5">
					Featured4
				</Card.Header>
				<Row>
					<Card.Body>
						<Col sm={8}>
							<Card.Text className="text-start">With supporting</Card.Text>
						</Col>
						<div className="info-plan">
							{["checkbox"].map(type => (
								<div key={`default-${type}`} className="info-check">
									<Col sm={2}>
										<Form.Check type={type} id={`default-${type}`} />
									</Col>
								</div>
							))}
						</div>
					</Card.Body>
				</Row>
			</Card>
			<Card className="mt-2">
				<Card.Header className="text-start" as="h5">
					Featured5
				</Card.Header>
				<Row>
					<Card.Body>
						<Col sm={8}>
							<Card.Text className="text-start">With supporting</Card.Text>
						</Col>
						<div className="info-plan">
							{["checkbox"].map(type => (
								<div key={`default-${type}`} className="info-check">
									<Col sm={2}>
										<Form.Check type={type} id={`default-${type}`} />
									</Col>
								</div>
							))}
						</div>
					</Card.Body>
				</Row>
			</Card>
			<Card className="mt-2">
				<Card.Header className="text-start" as="h5">
					Featured6
				</Card.Header>
				<Row>
					<Card.Body>
						<Col sm={8}>
							<Card.Text className="text-start">With supporting</Card.Text>
						</Col>
						<div className="info-plan">
							{["checkbox"].map(type => (
								<div key={`default-${type}`} className="info-check">
									<Col sm={2}>
										<Form.Check type={type} id={`default-${type}`} />
									</Col>
								</div>
							))}
						</div>
					</Card.Body>
				</Row>
			</Card>
			<Card className="mt-2">
				<Card.Header className="text-start" as="h5">
					Featured7
				</Card.Header>
				<Row>
					<Card.Body>
						<Col sm={8}>
							<Card.Text className="text-start">With supporting</Card.Text>
						</Col>
						<div className="info-plan">
							{["checkbox"].map(type => (
								<div key={`default-${type}`} className="info-check">
									<Col sm={2}>
										<Form.Check type={type} id={`default-${type}`} />
									</Col>
								</div>
							))}
						</div>
					</Card.Body>
				</Row>
			</Card>
			<Card className="mt-2">
				<Card.Header className="text-start" as="h5">
					Featured8
				</Card.Header>
				<Row>
					<Card.Body>
						<Col sm={8}>
							<Card.Text className="text-start">With supporting</Card.Text>
						</Col>
						<div className="info-plan">
							{["checkbox"].map(type => (
								<div key={`default-${type}`} className="info-check">
									<Col sm={2}>
										<Form.Check type={type} id={`default-${type}`} />
									</Col>
								</div>
							))}
						</div>
					</Card.Body>
				</Row>
			</Card>
			<Card className="mt-2">
				<Card.Header className="text-start" as="h5">
					Featured9
				</Card.Header>
				<Row>
					<Card.Body>
						<Col sm={8}>
							<Card.Text className="text-start">With supporting</Card.Text>
						</Col>
						<div className="info-plan">
							{["checkbox"].map(type => (
								<div key={`default-${type}`} className="info-check">
									<Col sm={2}>
										<Form.Check type={type} id={`default-${type}`} />
									</Col>
								</div>
							))}
						</div>
					</Card.Body>
				</Row>
			</Card>
			<Card className="mt-2">
				<Card.Header className="text-start" as="h5">
					Featured10
				</Card.Header>
				<Row>
					<Card.Body>
						<Col sm={8}>
							<Card.Text className="text-start">With supporting</Card.Text>
						</Col>
						<div className="info-plan">
							{["checkbox"].map(type => (
								<div key={`default-${type}`} className="info-check">
									<Col sm={2}>
										<Form.Check type={type} id={`default-${type}`} />
									</Col>
								</div>
							))}
						</div>
					</Card.Body>
				</Row>
			</Card>
			<Card className="mt-2">
				<Card.Header className="text-start" as="h5">
					Featured11
				</Card.Header>
				<Row>
					<Card.Body>
						<Col sm={8}>
							<Card.Text className="text-start">With supporting</Card.Text>
						</Col>
						<div className="info-plan">
							{["checkbox"].map(type => (
								<div key={`default-${type}`} className="info-check">
									<Col sm={2}>
										<Form.Check type={type} id={`default-${type}`} />
									</Col>
								</div>
							))}
						</div>
					</Card.Body>
				</Row>
			</Card>
		</div>
	);
};
