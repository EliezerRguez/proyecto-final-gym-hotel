import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../styles/info.scss";

export const Info = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>INFORMACION</h1>
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
				<Button className="boton-contacto w-100">CONTACTANOS</Button>
			</div>
			<br />
		</div>
	);
};
