import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../styles/home.scss";

export const Info = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>INFORMACION</h1>
			<Card className="mx-4">
				<Card.Img variant="top" src="holder.js/100px180" />
				IMAGEN GYM
				<Card.Body>
					<Card.Text>
						<div>
							<p>
								It has a wide range of high quality materials such as Xenios USA and Evergy with Olympic
								bars of 15kg and 20kg, 10kg bars for practice, weightlifting discs from 0.5kg to 25kg.
								from 0.5kg to 25kg. Two zones dedicated to free weights, barbell structure, rings, wall
								balls and a rings, wall balls, and one of these areas also has a boxing area, parallel
								bars and Muscle Upright bars. parallel bars and Muscle Ups bars.
							</p>
							<h3>Opening hours</h3>
							<p>10:00 - 22:00</p>
						</div>
					</Card.Text>
				</Card.Body>
			</Card>
			<br />

			<Card className="mx-4">
				<Card.Img variant="top" src="holder.js/100px180" />
				COVID PROTOCOLS
				<Card.Body>
					<Card.Text>
						<div>
							<p>
								Remember to bring your own facemask, use the hydroalcoholic gel and desinfect the
								machines after each use.
							</p>
						</div>
					</Card.Text>
				</Card.Body>
			</Card>
			<br />

			<Card className="mx-4">
				<Card.Img variant="top" src="holder.js/100px180" />
				CONTACT US
				<Card.Body>
					<Card.Text>
						<Link to="/plans">
							<Button variant="primary" type="submit">
								CALL US!
							</Button>
						</Link>
					</Card.Text>
				</Card.Body>
			</Card>
			<br />
		</div>
	);
};
