import React, { useContext } from "react";
import { Context } from "../store/appContext";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";
import "../../styles/home.scss";

export const Time = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>TIME</h1>
			<Badge bg="success">tiempo total</Badge> <Badge bg="danger">tiempo último ejercicio</Badge>{" "}
			<Badge bg="warning" text="dark">
				tiempo del día
			</Badge>
			<h4> Hasta la siguiente insignia</h4>
			<ProgressBar className="m-4">
				<ProgressBar striped variant="success" now={35} key={1} />
				<ProgressBar variant="warning" now={20} key={2} />
				<ProgressBar striped variant="danger" now={10} key={3} />
			</ProgressBar>
		</div>
	);
};
