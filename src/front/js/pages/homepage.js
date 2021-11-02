import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const Homepage = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="p-4">
			<>
				<Link to="/profile">
					<Card className="perfil">
						<Card.Body>
							<Card.Text className="faldon-perfil">
								<h2>Perfil</h2>
							</Card.Text>
						</Card.Body>
					</Card>
				</Link>
				<br />
				<Link to="/info">
					<Card className="info">
						<Card.Body>
							<Card.Text className="faldon-perfil">
								<h2>Gimnasio</h2>
							</Card.Text>
						</Card.Body>
					</Card>
				</Link>
				<br />
				<Link to="/plans">
					<Card className="plan">
						<Card.Body>
							<Card.Text className="faldon-plan">
								<h2>Plan</h2>
							</Card.Text>
						</Card.Body>
					</Card>
				</Link>
				<br />
				<Link to="/awards">
					<Card className="award text-center">
						<Card.Body>
							<Card.Text className="faldon-award">
								<h2>Programa de insignias</h2>
							</Card.Text>
						</Card.Body>
					</Card>
				</Link>
				<br />
			</>
		</div>
	);
};
