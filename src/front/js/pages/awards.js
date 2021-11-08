import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import Image from "react-bootstrap/Image";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
//import Card from "react-bootstrap/Card";

export const Awards = () => {
	const { store, actions } = useContext(Context);
	const [awards, setAwards] = useState([]);

	async function getAward() {
		const response = await fetch(process.env.BACKEND_URL + "/api/awards");
		const responseJson = await response.json();
		setAwards(responseJson);
	}
	useEffect(() => {
		getAward();
		actions.setShowNavbar(true);
	}, []);

	return (
		<div className="p-3 escritorio">
			<h1 className="text-center my-3">INSIGNIAS</h1>
			<Container>
				<Row className="text-center">
					{awards.map(award => {
						return (
							<Col xs={4} md={4} key={award.id}>
								<Image
									src={require(`../../img/icon/${award.image_on}.png`)}
									width="50"
									className="mb-3"
								/>
							</Col>
						);
					})}
				</Row>
				<Row className="contenedor-insignias">
					<Col>
						<p className="insignias-texto">
							Estos son algunas de las insignias que puedes ganar con tus entrenamientos, pero... ¿qué es
							una insignia? Para recompensar tu esfuerzo y dedicación hemos creado un sistema de
							recompensa para que puedas obtener beneficios en el hotel por hacer uso del gym. Cada
							insignia contiene un código único con un regalo diferente, desde descuentos en la tienda de
							souvenirs, hasta descuento en nuestro restaurante. No lo dudes y consiguelas todas.
						</p>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
