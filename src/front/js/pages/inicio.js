import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/inicio-login.scss";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

export const Inicio = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="p-4 pt-5 inicio h-100 text-center">
			<Row>
				<Col xs={12} sm={6}>
					<Image src={require(`../../img/imagen-gym-inicio.png`)} width="90%" />
				</Col>
				<Col xs={12} sm={6}>
					<span className="mt-4 text-dark subtitulo">Bienvenido a</span>
					<h1 className="text-dark titulo">APPTIVATE</h1>
					<Link to="/login" className="text-center">
						<Button className="button-inicio w-75" size="lg">
							¡EMPEZAMOS!
						</Button>
					</Link>
				</Col>
			</Row>
		</div>
	);
};
