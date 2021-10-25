import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "../../styles/home.scss";

export const Homepage = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>HOMEPAGE</h1>
			<>
				<Card className="mx-4">
					<Card.Img variant="top" src="holder.js/100px180" />
					Imagen de perfil persona
					<Card.Body>
						<Card.Text>
							<Link to="/profile">
								<Button variant="primary" type="submit">
									My Profile
								</Button>
							</Link>
						</Card.Text>
					</Card.Body>
				</Card>
				<br />

				<Card className="mx-4">
					<Card.Img variant="top" src="holder.js/100px180" />
					Imagen de info
					<Card.Body>
						<Card.Text>
							<Link to="/info">
								<Button variant="primary" type="submit">
									Gym details
								</Button>
							</Link>
						</Card.Text>
					</Card.Body>
				</Card>
				<br />

				<Card className="mx-4">
					<Card.Img variant="top" src="holder.js/100px180" />
					Imagen de gente haciendo cosas
					<Card.Body>
						<Card.Text>
							<Link to="/plans">
								<Button variant="primary" type="submit">
									OUR PLAN OR CUSTOMIZE PLAN
								</Button>
							</Link>
						</Card.Text>
					</Card.Body>
				</Card>
				<br />

				<Card className="mx-4">
					<Card.Img variant="top" src="holder.js/100px180" />
					Imagen insignias pokedex
					<Card.Body>
						<Card.Text>
							<Link to="/awards">
								<Button variant="primary" type="submit">
									ALL AWARDS AND DESCRIPTION
								</Button>
							</Link>
						</Card.Text>
					</Card.Body>
				</Card>
				<br />
			</>
		</div>
	);
};
