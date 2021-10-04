import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.scss";
import Button from "react-bootstrap/Button";

export const Inicio = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>INICIO</h1>
			<Link to="/login">
				<button className="mt-5" size="lg">
					Comenzamos
				</button>
			</Link>
		</div>
	);
};
