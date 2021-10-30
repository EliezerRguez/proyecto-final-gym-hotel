import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/inicio-login.scss";
import Button from "react-bootstrap/Button";

export const Inicio = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="p-4 inicio h-100 text-center">
			<h1 className="text-light titulo">APPTIVATE</h1>
			<p className="text-light subtitulo">Ready, steady, go!</p>
			<Link to="/login" className="text-center">
				<Button className="mt-3 button-inicio w-75" size="lg">
					Let´s start
				</Button>
			</Link>
		</div>
	);
};
