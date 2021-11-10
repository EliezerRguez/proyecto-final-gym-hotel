import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

export const Homepage = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.setShowNavbar(true);
	}, []);

	return (
		<div className="px-4 py-3 escritorio">
			<>
				<Row>
					<Col xs={12} sm={6} className="mb-4">
						<Link to="/profile">
							<Card className="perfil">
								<Card.Body>
									<Card.Text className="faldon-perfil">
										<span>Perfil</span>
									</Card.Text>
								</Card.Body>
							</Card>
						</Link>
					</Col>
					<Col xs={12} sm={6} className="mb-4">
						<Link to="/info">
							<Card className="info">
								<Card.Body>
									<Card.Text className="faldon-perfil">
										<span>Gimnasio</span>
									</Card.Text>
								</Card.Body>
							</Card>
						</Link>
					</Col>
				</Row>
				<Row>
					<Col xs={12} sm={6} className="mb-4">
						<Link to="/plans">
							<Card className="plan">
								<Card.Body>
									<Card.Text className="faldon-plan">
										<span>Plan</span>
									</Card.Text>
								</Card.Body>
							</Card>
						</Link>
					</Col>
					<Col xs={12} sm={6} className="mb-4">
						<Link to="/awards">
							<Card className="award">
								<Card.Body>
									<Card.Text className="faldon-award">
										<span>Programa de insignias</span>
									</Card.Text>
								</Card.Body>
							</Card>
						</Link>
					</Col>
				</Row>
			</>
		</div>
	);
};
