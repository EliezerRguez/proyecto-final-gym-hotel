import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import "../../styles/home.scss";

export const PersonalPlan = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>PERSONAL PLAN</h1>
			<Accordion defaultActiveKey="0" flush>
				<Accordion.Item eventKey="0">
					<Accordion.Header>Ejercicio #1</Accordion.Header>
					<Accordion.Body>
						<p>Tiempo total de ejecución: 15 minutos</p> <p>Nivel dificultad: estrellitas</p>
						<Link to="/exercise">
							<Button variant="outline-dark">Apptivate!</Button>
						</Link>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>Ejercicio #2</Accordion.Header>
					<Accordion.Body>
						<p>Tiempo total de ejecución: 10 minutos</p> <p>Nivel dificultad: estrellitas</p>
						<Link to="/exercise">
							<Button variant="outline-dark">Apptivate!</Button>
						</Link>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="2">
					<Accordion.Header>Ejercicio #3</Accordion.Header>
					<Accordion.Body>
						<p>Tiempo total de ejecución: 5 minutos </p>
						<p>Nivel dificultad: estrellitas</p>
						<Link to="/exercise">
							<Button variant="outline-dark">Apptivate!</Button>
						</Link>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="3">
					<Accordion.Header>Ejercicio #4</Accordion.Header>
					<Accordion.Body>
						<p>Tiempo total de ejecución: 25 minutos</p> <p>Nivel dificultad: estrellitas</p>
						<Link to="/exercise">
							<Button variant="outline-dark">Apptivate!</Button>
						</Link>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="4">
					<Accordion.Header>Ejercicio #5</Accordion.Header>
					<Accordion.Body>
						<p>Tiempo total de ejecución: 20 minutos</p> <p>Nivel dificultad: estrellitas</p>
						<Link to="/exercise">
							<Button variant="outline-dark">Apptivate!</Button>
						</Link>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="5">
					<Accordion.Header>Ejercicio #6</Accordion.Header>
					<Accordion.Body>
						<p>Tiempo total de ejecución: 4 minutos</p> <p>Nivel dificultad: estrellitas</p>
						<Link to="/exercise">
							<Button variant="outline-dark">Apptivate!</Button>
						</Link>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="6">
					<Accordion.Header>Ejercicio #7</Accordion.Header>
					<Accordion.Body>
						<p>Tiempo total de ejecución: 10 minutos</p> <p>Nivel dificultad: estrellitas</p>
						<Link to="/exercise">
							<Button variant="outline-dark">Apptivate!</Button>
						</Link>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="7">
					<Accordion.Header>Ejercicio #8</Accordion.Header>
					<Accordion.Body>
						<p>Tiempo total de ejecución: 5 minutos</p> <p>Nivel dificultad: estrellitas</p>
						<Link to="/exercise">
							<Button variant="outline-dark">Apptivate!</Button>
						</Link>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="8">
					<Accordion.Header>Ejercicio #9</Accordion.Header>
					<Accordion.Body>
						<p>Tiempo total de ejecución: 2 minutos</p> <p>Nivel dificultad: estrellitas</p>
						<Link to="/exercise">
							<Button variant="outline-dark">Apptivate!</Button>
						</Link>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="9">
					<Accordion.Header>Ejercicio #10</Accordion.Header>
					<Accordion.Body>
						<p>Tiempo total de ejecución: 3 minutos</p> <p>Nivel dificultad: estrellitas</p>
						<Link to="/exercise">
							<Button variant="outline-dark">Apptivate!</Button>
						</Link>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</div>
	);
};
