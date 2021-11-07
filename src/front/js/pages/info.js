import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../styles/info.scss";

export const Info = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.setShowNavbar(true);
	}, []);

	return (
		<div className="text-center mt-3 escritorio">
			<h1>INFORMACIÓN</h1>
			<br />

			<Card className="mx-4 covid-protocol">
				<Card.Img variant="top" src={require(`../../img/info-covid.jpg`)} />

				<Card.Body>
					<h3>PROTOCOLO COVID</h3>
					<Card.Text>
						<span>
							Recuerde llevar su propia mascarilla, utilizar el gel hidroalcohólico y desinfectar las
							máquinas después de cada uso.
						</span>
					</Card.Text>
				</Card.Body>
			</Card>
			<br />
			<div className="mx-4">
				<a className="boton-contacto" href="tel:3478956387">
					CONTACTANOS
				</a>
			</div>
			<br />
		</div>
	);
};
